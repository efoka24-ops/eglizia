// Campay Payment API Client
// API Documentation: https://demo.campay.net/api/

interface PaymentLinkPayload {
  amount: string
  currency: string
  description: string
  external_reference: string
  redirect_url: string
}

interface CollectPayload {
  amount: string
  from: string
  description: string
  external_reference: string
}

interface TransactionResponse {
  reference: string
  amount: string
  currency: string
  status: string
  description: string
  external_reference: string
  created_at: string
  updated_at: string
}

class CampayClient {
  private username: string
  private password: string
  private apiUrl: string
  private accessToken: string | null = null
  private tokenExpiry: number | null = null

  constructor(
    username: string = import.meta.env.VITE_CAMPAY_USERNAME || '',
    password: string = import.meta.env.VITE_CAMPAY_PASSWORD || '',
    apiUrl: string = import.meta.env.VITE_CAMPAY_API_URL || 'https://demo.campay.net/api'
  ) {
    this.username = username
    this.password = password
    this.apiUrl = apiUrl.replace(/\/$/, '') // Remove trailing slash
  }

  /**
   * Get access token from Campay
   */
  private async getToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      const response = await fetch(`${this.apiUrl}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Campay token error response:', response.status, errorData)
        throw new Error(`Failed to get token: ${response.status}`)
      }

      const data = await response.json()
      this.accessToken = data.token

      // Token expires in ~3600 seconds, cache for 3500 seconds
      this.tokenExpiry = Date.now() + 3500000

      return data.token
    } catch (error) {
      console.error('Error getting Campay token:', error)
      throw error
    }
  }

  /**
   * Make authenticated request to Campay API
   */
  private async request<T>(
    endpoint: string,
    method: string = 'GET',
    body?: any
  ): Promise<T> {
    const token = await this.getToken()

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        `Campay API error: ${response.status} - ${JSON.stringify(errorData)}`
      )
    }

    return response.json()
  }

  /**
   * Create a payment link for donations
   */
  async createPaymentLink(
    amount: string,
    description: string,
    externalReference: string,
    redirectUrl: string,
    currency: string = 'XAF'
  ): Promise<{ payment_link: string; reference: string }> {
    const payload: PaymentLinkPayload = {
      amount,
      currency,
      description,
      external_reference: externalReference,
      redirect_url: redirectUrl,
    }

    const response = await this.request<any>(
      '/get_payment_link/',
      'POST',
      payload
    )

    return {
      payment_link: response.payment_link || response.url,
      reference: response.reference || externalReference,
    }
  }

  /**
   * Collect payment directly from phone number
   */
  async collectPayment(
    amount: string,
    phoneNumber: string,
    description: string,
    externalReference: string
  ): Promise<TransactionResponse> {
    const payload: CollectPayload = {
      amount,
      from: phoneNumber,
      description,
      external_reference: externalReference,
    }

    return this.request<TransactionResponse>(
      '/collect/',
      'POST',
      payload
    )
  }

  /**
   * Check transaction status
   */
  async getTransactionStatus(
    reference: string
  ): Promise<TransactionResponse> {
    return this.request<TransactionResponse>(
      `/transaction/${reference}/`,
      'GET'
    )
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<{ balance: string; currency: string }> {
    return this.request('/balance/', 'GET')
  }

  /**
   * Get transaction history
   */
  async getHistory(
    startDate: string,
    endDate: string
  ): Promise<TransactionResponse[]> {
    return this.request<TransactionResponse[]>('/history/', 'POST', {
      start_date: startDate,
      end_date: endDate,
    })
  }

  /**
   * Withdraw funds to phone number
   */
  async withdraw(
    amount: string,
    phoneNumber: string,
    description: string,
    externalReference: string
  ): Promise<TransactionResponse> {
    return this.request<TransactionResponse>('/withdraw/', 'POST', {
      amount,
      to: phoneNumber,
      description,
      external_reference: externalReference,
    })
  }

  /**
   * Get transaction status via utility endpoint
   */
  async getUtilityTransactionStatus(
    reference: string
  ): Promise<TransactionResponse> {
    return this.request<TransactionResponse>(
      `/utilities/transaction/${reference}/`,
      'GET'
    )
  }

  /**
   * Format phone number to Campay format
   */
  formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[^\d+]/g, '')
    
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1)
    }
    
    // Assume Cameroon (237) if no country code
    if (!cleaned.startsWith('237')) {
      if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1)
      }
      cleaned = '237' + cleaned
    }
    
    return cleaned
  }

  /**
   * Validate phone number format
   */
  isValidPhoneNumber(phone: string): boolean {
    const cleaned = this.formatPhoneNumber(phone)
    return /^\d{10,}$/.test(cleaned)
  }
}

// Export singleton instance
export const campay = new CampayClient()

export type { PaymentLinkPayload, CollectPayload, TransactionResponse }
export default campay
