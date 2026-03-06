import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = './public/images/overdose';

// Oil painting style prompts for the 10 paintings
const paintings = [
  {
    id: '01',
    prompt: 'Oil painting on canvas, an abandoned vintage MP3 player from the 2000s lying on a weathered wooden surface, surrounded by lush succulents and small cacti growing through cracks, soft painterly brushstrokes, deep Prussian blue and warm ochre palette, visible canvas texture, fine art still life, botanical overgrowth, melancholic atmosphere, museum quality, highly detailed, 4K'
  },
  {
    id: '02',
    prompt: 'Oil painting on canvas, a vintage flip phone from the early 2000s half-covered in soft green moss and small delicate flowers, resting on aged stone, painterly style with visible brushwork, deep blue and earthy green palette, nature reclaiming technology, still life composition, fine art, museum quality, detailed texture'
  },
  {
    id: '03',
    prompt: 'Oil painting on canvas, a colorful iMac G3 computer with a small cactus growing from the disk drive slot, sitting on an artist worktable, visible brushstrokes, warm Prussian blue shadows and botanical greens, nostalgic tech meeting nature, still life, fine art quality, canvas texture visible'
  },
  {
    id: '04',
    prompt: 'Oil painting on canvas, a classic Nokia 3310 phone entwined with desert flowers and small succulents, lying on warm sand-colored surface, painterly execution with rich impasto brushwork, deep blue accents and ochre earth tones, nature and technology fusion, still life, museum quality fine art'
  },
  {
    id: '05',
    prompt: 'Oil painting on canvas, an old laptop from the MSN era open on a table surrounded by wild grasses and small flowers growing around it, screen glowing faintly, painterly brushwork, deep blues and warm greens, nostalgic atmosphere, nature overtaking technology, still life composition, fine art quality'
  },
  {
    id: '06',
    prompt: 'Oil painting on canvas, an original iPhone lying in golden sand with the shadow of a tall cactus falling across it, desert scene at golden hour, visible brushstrokes and canvas texture, deep blue sky and warm ochre sand, contemplative mood, fine art still life, museum quality'
  },
  {
    id: '07',
    prompt: 'Oil painting on canvas, a Greek amphora vase with a Facebook notification icon painted on it, cracked and repaired with gold kintsugi style, surrounded by dried flowers, classical meets digital, painterly execution with visible brushwork, Prussian blue and gold palette, still life, fine art museum quality'
  },
  {
    id: '08',
    prompt: 'Oil painting on canvas, a tablet device reflected in still dark water with lily pads floating nearby, moonlit scene, soft painterly brushstrokes, deep Prussian blue water and soft green lily pads, contemplative atmosphere, technology floating in nature, fine art still life, canvas texture visible'
  },
  {
    id: '09',
    prompt: 'Oil painting on canvas, a modern smartphone lying face-down in rich dark soil with a small green seedling emerging from beneath it, close-up still life, visible impasto brushwork, earthy browns and fresh greens with deep blue shadows, nature reclaiming technology, fine art museum quality, detailed texture'
  },
  {
    id: '10',
    prompt: 'Oil painting on canvas, an abstract glowing AI interface screen slowly being consumed by climbing green vines and leaves, nature taking over technology, painterly execution with visible canvas texture, deep blues and rich greens, ethereal atmosphere, fine art contemporary piece, museum quality'
  }
];

async function generateImages() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const zai = await ZAI.create();
  
  console.log('Starting image generation for Overdose collection...');
  
  for (const painting of paintings) {
    const outputPath = path.join(outputDir, `painting-${painting.id}.jpg`);
    
    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`✓ Skipping ${painting.id} - already exists`);
      continue;
    }
    
    try {
      console.log(`Generating painting ${painting.id}...`);
      
      const response = await zai.images.generations.create({
        prompt: painting.prompt,
        size: '864x1152' // Portrait orientation for paintings
      });

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`✓ Generated: painting-${painting.id}.jpg`);
      
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Failed to generate painting ${painting.id}:`, error);
    }
  }
  
  console.log('Image generation complete!');
}

generateImages().catch(console.error);
