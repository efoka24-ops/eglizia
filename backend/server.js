import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'data.json');

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5001',
  'https://eglizia.cm'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Helper functions
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return {};
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ Data saved to data.json');
    return true;
  } catch (error) {
    console.error('Error writing data.json:', error);
    return false;
  }
}

// ============= HEALTH ROUTES =============

app.get('/', (req, res) => {
  res.json({
    status: 'Eglizia Backend is running',
    message: 'API pour site d\'église',
    version: '1.0',
    endpoints: {
      health: '/api/health',
      church: '/api/church',
      services: '/api/services',
      leadership: '/api/leadership',
      events: '/api/events',
      news: '/api/news',
      testimonies: '/api/testimonies',
      contacts: '/api/contacts',
      settings: '/api/settings'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// ============= CHURCH ROUTES =============

app.get('/api/church', (req, res) => {
  try {
    const data = readData();
    res.json(data.church || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= SERVICES ROUTES =============

app.get('/api/services', (req, res) => {
  try {
    const data = readData();
    res.json(data.services || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/services', (req, res) => {
  try {
    const data = readData();
    const newId = Math.max(0, ...data.services.map(s => s.id)) + 1;

    const service = {
      id: newId,
      day: req.body.day,
      time: req.body.time,
      type: req.body.type,
      description: req.body.description,
      duration: req.body.duration || ''
    };

    data.services.push(service);
    writeData(data);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.services.findIndex(s => s.id == id);

    if (index === -1) return res.status(404).json({ error: 'Service not found' });

    data.services[index] = {
      ...data.services[index],
      day: req.body.day || data.services[index].day,
      time: req.body.time || data.services[index].time,
      type: req.body.type || data.services[index].type,
      description: req.body.description || data.services[index].description,
      duration: req.body.duration || data.services[index].duration
    };

    writeData(data);
    res.json(data.services[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.services.findIndex(s => s.id == id);

    if (index === -1) return res.status(404).json({ error: 'Service not found' });

    const deleted = data.services.splice(index, 1);
    writeData(data);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= LEADERSHIP ROUTES =============

app.get('/api/leadership', (req, res) => {
  try {
    const data = readData();
    res.json(data.leadership || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leadership/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const member = data.leadership.find(l => l.id == id);

    if (!member) return res.status(404).json({ error: 'Leadership member not found' });

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= EVENTS ROUTES =============

app.get('/api/events', (req, res) => {
  try {
    const data = readData();
    res.json(data.events || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', (req, res) => {
  try {
    const data = readData();
    const newId = Math.max(0, ...data.events.map(e => e.id)) + 1;

    const event = {
      id: newId,
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description,
      capacity: req.body.capacity || 100,
      registered: req.body.registered || 0
    };

    data.events.push(event);
    writeData(data);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/events/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.events.findIndex(e => e.id == id);

    if (index === -1) return res.status(404).json({ error: 'Event not found' });

    data.events[index] = {
      ...data.events[index],
      title: req.body.title || data.events[index].title,
      date: req.body.date || data.events[index].date,
      time: req.body.time || data.events[index].time,
      location: req.body.location || data.events[index].location,
      description: req.body.description || data.events[index].description,
      capacity: req.body.capacity || data.events[index].capacity,
      registered: req.body.registered || data.events[index].registered
    };

    writeData(data);
    res.json(data.events[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/events/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.events.findIndex(e => e.id == id);

    if (index === -1) return res.status(404).json({ error: 'Event not found' });

    const deleted = data.events.splice(index, 1);
    writeData(data);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= NEWS ROUTES =============

app.get('/api/news', (req, res) => {
  try {
    const data = readData();
    res.json(data.news || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/news', (req, res) => {
  try {
    const data = readData();
    const newId = Math.max(0, ...data.news.map(n => n.id)) + 1;

    const news = {
      id: newId,
      title: req.body.title,
      date: new Date().toISOString().split('T')[0],
      content: req.body.content,
      image: req.body.image || ''
    };

    data.news.push(news);
    writeData(data);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.news.findIndex(n => n.id == id);

    if (index === -1) return res.status(404).json({ error: 'News not found' });

    data.news[index] = {
      ...data.news[index],
      title: req.body.title || data.news[index].title,
      content: req.body.content || data.news[index].content,
      image: req.body.image || data.news[index].image
    };

    writeData(data);
    res.json(data.news[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.news.findIndex(n => n.id == id);

    if (index === -1) return res.status(404).json({ error: 'News not found' });

    const deleted = data.news.splice(index, 1);
    writeData(data);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= TESTIMONIES ROUTES =============

app.get('/api/testimonies', (req, res) => {
  try {
    const data = readData();
    res.json(data.testimonies || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/testimonies', (req, res) => {
  try {
    const data = readData();
    const newId = Math.max(0, ...data.testimonies.map(t => t.id)) + 1;

    const testimony = {
      id: newId,
      name: req.body.name,
      title: req.body.title,
      testimony: req.body.testimony,
      rating: req.body.rating || 5,
      date: new Date().toISOString().split('T')[0]
    };

    data.testimonies.push(testimony);
    writeData(data);
    res.status(201).json(testimony);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= CONTACTS ROUTES =============

app.get('/api/contacts', (req, res) => {
  try {
    const data = readData();
    res.json(data.contacts || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contacts', (req, res) => {
  try {
    const data = readData();
    const newId = Math.max(0, ...(data.contacts || []).map(c => c.id)) + 1;

    const contact = {
      id: newId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
      date: new Date().toISOString(),
      status: 'pending'
    };

    if (!data.contacts) data.contacts = [];
    data.contacts.push(contact);
    writeData(data);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= SETTINGS ROUTES =============

app.get('/api/settings', (req, res) => {
  try {
    const data = readData();
    res.json(data.settings || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const data = readData();
    data.settings = {
      ...data.settings,
      ...req.body
    };
    writeData(data);
    res.json(data.settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= 404 HANDLER =============

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============= SERVER START =============

app.listen(PORT, () => {
  console.log(`✅ Eglizia Backend running on port ${PORT}`);
  console.log(`📊 Database: JSON (data.json)`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🙏 Church website API ready for service`);
});

export default app;
