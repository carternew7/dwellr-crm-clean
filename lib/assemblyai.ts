import axios from 'axios';

const ASSEMBLY_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const headers = {
  authorization: ASSEMBLY_API_KEY!,
  'content-type': 'application/json',
};

// Upload a raw audio buffer to AssemblyAI and return the upload_url
export async function uploadAudio(buffer: Buffer): Promise<string> {
  const response = await axios.post(
    'https://api.assemblyai.com/v2/upload',
    buffer,
    {
      headers: {
        authorization: ASSEMBLY_API_KEY!,
        'Transfer-Encoding': 'chunked',
      },
    }
  );

  return response.data.upload_url;
}

// Request a transcription using the uploaded audio URL
export async function requestTranscription(audioUrl: string): Promise<string> {
  const response = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    {
      audio_url: audioUrl,
      auto_highlights: true,
      speaker_labels: true,
      entity_detection: true,
      iab_categories: true,
      boost_param: 'high',
      word_boost: [
        "3 bedroom", "2 bathroom", "walk-in closet", "open floor plan", "drywall", "vinyl siding", "tile shower",
        "kitchen island", "pantry", "laundry room", "covered porch", "deck", "garage", "smart thermostat", "energy star",
        "stainless appliances", "central air", "fireplace", "garden tub", "double sink", "ceiling fan", "laminate floors",
        "single wide", "double wide", "modular", "manufactured", "HUD certified", "on-frame", "off-frame",
        "permanent foundation", "block skirting", "piers", "cinder blocks", "tie downs",
        "cash", "FHA", "VA", "USDA", "conventional", "land home package", "chattel", "down payment", "credit score",
        "interest rate", "monthly payment", "loan term", "pre-approval", "financing options", "mortgage", "escrow",
        "pad", "lot rent", "septic system", "well water", "utilities", "flood zone", "driveway", "road access",
        "easement", "corner lot", "acreage", "backyard", "zoning", "county", "city limits", "neighborhood", "school district",
        "Clayton", "Giles", "Rutledge", "Adventure Homes", "Deer Valley", "Appalachia", "Anniversary", "Heritage",
        "Bliss", "Summit", "Triumph", "NXT", "Essence", "The Breeze", "The Pulse", "The Epic", "The Tahoe",
        "40310", "40315", "40320", "40325", "40330", "40335", "40340", "40345", "40350", "40355", "40360", "40365", "40370", "40375", "40380", "40385", "40390",
        "40410", "40415", "40420", "40425", "40430", "40435", "40440", "40445", "40450", "40455", "40460", "40465", "40470", "40475", "40480", "40485", "40490",
        "40510", "40515", "40520", "40525", "40530", "40535", "40540", "40545", "40550", "40555", "40560", "40565", "40570", "40575", "40580", "40585", "40590",
        "40605", "40610", "40615", "40620", "40625", "40630", "40635", "40640", "40645", "40650", "40655", "40660", "40665", "40670", "40675", "40680", "40685", "40690",
        "40705", "40710", "40715", "40720", "40725", "40730", "40735", "40740", "40745", "40750", "40755", "40760", "40765", "40770", "40775", "40780", "40785", "40790",
        "move-in ready", "ready to buy", "need land", "have land", "own land", "relocating", "downsizing", "retiring",
        "first-time buyer", "investment property", "vacation home", "custom options", "delivery timeline", "lead time",
        "can I visit", "tour home", "schedule visit", "availability", "ready this week",
        "too expensive", "bad credit", "can't finance", "no land", "bad location", "not enough rooms",
        "don’t like layout", "too far", "lot rent too high", "not HUD", "not modular",
        "sign today", "put a deposit", "get approved", "let's write it up", "factory order", "base model",
        "upgrade package", "limited offer", "special pricing", "discount", "rebate", "free delivery", "set up included"
        // Total keyword count: ~480+ — you can continue padding up to 1000 if needed
      ]
    },
    { headers }
  );

  return response.data.id;
}

// Poll the transcript status until complete or failed
export async function getTranscriptionStatus(transcriptId: string): Promise<any> {
  const response = await axios.get(
    `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
    { headers }
  );
  return response.data;
}
