import axios from 'axios';

const API_BASE = process.env.OPEN_GENAI_API_BASE || 'http://localhost:7860/api';
const MUAPI_KEY = process.env.MUAPI_KEY || '';

/**
 * Call the Open Generative AI backend to generate media.
 * @param {Object} options
 * @param {string} options.prompt - The generation prompt
 * @param {string} options.mode - 'image', 'video', or 'lipsync'
 * @param {string} [options.model='flux'] - Model name
 * @param {string} [options.image] - Image URL (required for lipsync)
 * @param {string} [options.audio] - Audio URL (required for lipsync)
 * @returns {Promise<{type: 'url'|'buffer', data: string|Buffer}>}
 */
export async function generateMedia({ prompt, mode, model = 'flux', image, audio }) {
  // Build payload according to expected API endpoints.
  // This is a skeleton; endpoint paths and shapes depend on the actual backend.
  // Here we assume a RESTful interface like:
  //   POST /api/generate { mode, prompt, model, ... }
  // and response contains a media URL or base64 data.

  const payload = {
    mode,
    prompt,
    model,
    ...(image && { image_url: image }),
    ...(audio && { audio_url: audio }),
  };

  // If using MuAPI, add authentication header
  const headers = {};
  if (MUAPI_KEY) {
    headers['x-api-key'] = MUAPI_KEY;
  }

  try {
    const response = await axios.post(`${API_BASE}/generate`, payload, {
      headers,
      timeout: 300000, // 5 min for long video gen
    });

    // Adapt response parsing based on actual structure
    const data = response.data;
    // Possible shapes: { url: '...' } or { data: Buffer/ArrayBuffer }
    if (data.url) {
      return { type: 'url', data: data.url };
    } else if (data.buffer) {
      return { type: 'buffer', data: Buffer.from(data.buffer, 'base64') };
    } else if (data.data) {
      // maybe base64 string
      return { type: 'buffer', data: Buffer.from(data.data, 'base64') };
    } else {
      throw new Error('Unexpected response format from API');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`API error: ${error.response.status} ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}
