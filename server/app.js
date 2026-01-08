const express = require('express');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    ai_connection: true
  });
});

// API endpoint pour générer le lorem ipsum
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, length } = req.body;

    // Validation des paramètres
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Le prompt est requis'
      });
    }

    // Génération de contenu simulé pour les tests
    let contentLength = 50;
    if (length === 'long') {
      contentLength = 150;
    } else if (length === 'medium') {
      contentLength = 100;
    }

    const content = `Generated content for "${prompt}". `.repeat(Math.ceil(contentLength / 30));

    res.json({
      success: true,
      content: content.substring(0, contentLength)
    });

  } catch (error) {
    console.error('Erreur lors de la génération:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

module.exports = app;
