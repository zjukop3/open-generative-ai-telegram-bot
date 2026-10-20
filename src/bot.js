import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { generateMedia } from './api.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN in .env');
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply(
    '👋 Welcome to Open Generative AI Telegram Bot!\n\n' +
    'Generate images, videos, and lip‑sync animations using 600+ AI models.\n' +
    'Try /help for commands or send /generate directly.'
  );
});

bot.help((ctx) => {
  return ctx.reply(
    '🤖 *Commands*\n' +
    '/start – Welcome message\n' +
    '/help – This help\n' +
    '/generate `<prompt>` `--mode <image|video|lipsync>` `[--model <name>]` `[--image <url>]` `[--audio <url>]`\n\n' +
    '*Examples:*\n' +
    '`/generate a sunset over mars --mode image --model flux`\n' +
    '`/generate a cat driving a car --mode video --model sora`\n' +
    '`/generate make her say wow --mode lipsync --image https://example.com/face.jpg --audio https://example.com/voice.mp3`',
    { parse_mode: 'Markdown' }
  );
});

bot.command('generate', async (ctx) => {
  const message = ctx.message.text;
  // Remove the '/generate' command part
  const argsString = message.slice('/generate'.length).trim();
  if (!argsString) {
    return ctx.reply('Usage: /generate <prompt> --mode <image|video|lipsync> [--model <name>] [--image <url>] [--audio <url>]');
  }

  // Simple argument parsing
  const args = argsString.match(/(?:[^"']\S*|"[^"]*"|'[^']*')+/g) || [];
  const params = { mode: 'image', model: 'flux', prompt: '', image: '', audio: '' };
  let i = 0;
  while (i < args.length) {
    const arg = args[i].replace(/^["']|["']$/g, ''); // remove surrounding quotes
    if (arg === '--mode' && i + 1 < args.length) {
      params.mode = args[++i].replace(/^["']|["']$/g, '');
    } else if (arg === '--model' && i + 1 < args.length) {
      params.model = args[++i].replace(/^["']|["']$/g, '');
    } else if (arg === '--image' && i + 1 < args.length) {
      params.image = args[++i].replace(/^["']|["']$/g, '');
    } else if (arg === '--audio' && i + 1 < args.length) {
      params.audio = args[++i].replace(/^["']|["']$/g, '');
    } else {
      // accumulate prompt
      params.prompt += (params.prompt ? ' ' : '') + arg;
    }
    i++;
  }

  const prompt = params.prompt.trim();
  if (!prompt) {
    return ctx.reply('Please provide a prompt. Example: /generate a mountain landscape --mode image');
  }

  // Validate mode
  const validModes = ['image', 'video', 'lipsync'];
  if (!validModes.includes(params.mode)) {
    return ctx.reply(`Invalid mode. Use: ${validModes.join(', ')}`);
  }

  // Lipsync requires image and audio
  if (params.mode === 'lipsync' && (!params.image || !params.audio)) {
    return ctx.reply('Lipsync mode requires both --image and --audio URLs.');
  }

  try {
    ctx.reply(`⏳ Generating ${params.mode} with model "${params.model}"...`);
    const result = await generateMedia({
      prompt,
      mode: params.mode,
      model: params.model,
      image: params.image,
      audio: params.audio,
    });

    // The backend is expected to return a URL or file buffer
    if (result.type === 'url') {
      if (params.mode === 'image') {
        await ctx.replyWithPhoto(result.data);
      } else if (params.mode === 'video') {
        await ctx.replyWithVideo(result.data);
      } else if (params.mode === 'lipsync') {
        // Lipsync result is a video
        await ctx.replyWithVideo(result.data);
      }
    } else if (result.type === 'buffer') {
      if (params.mode === 'image') {
        await ctx.replyWithPhoto({ source: result.data });
      } else if (params.mode === 'video' || params.mode === 'lipsync') {
        await ctx.replyWithVideo({ source: result.data });
      }
    } else {
      ctx.reply('❌ Unsupported result type from API.');
    }
  } catch (error) {
    console.error('Generation error:', error);
    ctx.reply(`❌ Generation failed: ${error.message}`);
  }
});

// Catch all other messages
bot.on('text', (ctx) => {
  ctx.reply('Send /help to see available commands.');
});

// Start polling
try {
  bot.launch();
  console.log('🤖 Bot started. Press Ctrl+C to stop.');
} catch (err) {
  console.error('Bot launch error:', err);
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
