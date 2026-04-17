// OpenWeather Agro API Service
const AGRO_API_KEY = 'c48ecd17a906c82b61a1e53dd4888d43';
const AGRO_BASE_URL = 'https://api.agromonitoring.com/agro/1.0';

// Create polygon first (run once)
export const createPolygon = async (name, lat, lon) => {
  try {
    const response = await fetch(`${AGRO_BASE_URL}/polygons?appid=${AGRO_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        geo_json: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [lon - 0.01, lat - 0.01],
              [lon + 0.01, lat - 0.01],
              [lon + 0.01, lat + 0.01],
              [lon - 0.01, lat + 0.01],
              [lon - 0.01, lat - 0.01]
            ]]
          }
        }
      })
    });
    const data = await response.json();
    console.log('Polygon created:', data.id);
    return data.id;
  } catch (error) {
    console.error('Polygon creation error:', error);
    return null;
  }
};

export const fetchSatelliteData = async (polygonId) => {
  try {
    if (!polygonId || polygonId === 'YOUR_POLYGON_ID') {
      return getDemoData();
    }

    const now = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60);

    const ndviResponse = await fetch(
      `${AGRO_BASE_URL}/ndvi/history?polyid=${polygonId}&start=${thirtyDaysAgo}&end=${now}&appid=${AGRO_API_KEY}`
    );
    
    if (!ndviResponse.ok) {
      console.log('NDVI API error:', ndviResponse.status, await ndviResponse.text());
      return getDemoData();
    }

    const ndviData = await ndviResponse.json();
    console.log('NDVI Data:', ndviData);
    
    if (!ndviData || ndviData.length === 0) {
      console.log('No NDVI data available');
      return getDemoData();
    }

    const latestNdvi = ndviData[ndviData.length - 1];
    const ndviValue = latestNdvi?.data?.mean || 0.65;

    const imageResponse = await fetch(
      `${AGRO_BASE_URL}/image/search?polyid=${polygonId}&start=${thirtyDaysAgo}&end=${now}&appid=${AGRO_API_KEY}`
    );
    const imageData = imageResponse.ok ? await imageResponse.json() : [];
    const latestImage = imageData[0];

    return {
      ndvi: ndviValue,
      cropHealth: getCropHealthStatus(ndviValue),
      canopyCover: calculateCanopyCover(ndviValue),
      imageUrl: latestImage?.image?.truecolor || null,
      lastUpdated: latestNdvi?.dt ? new Date(latestNdvi.dt * 1000).toLocaleDateString() : new Date().toLocaleDateString(),
      error: null
    };
  } catch (error) {
    console.error('Satellite data fetch error:', error);
    return getDemoData();
  }
};

const getDemoData = () => {
  console.log('Using demo data');
  return {
    ndvi: 0.68,
    cropHealth: 'Good',
    canopyCover: 68.0,
    imageUrl: null,
    lastUpdated: new Date().toLocaleDateString(),
    error: 'Using demo data - check polygon ID'
  };
};

const getCropHealthStatus = (ndvi) => {
  if (ndvi >= 0.6) return 'Excellent';
  if (ndvi >= 0.4) return 'Good';
  if (ndvi >= 0.2) return 'Moderate';
  return 'Poor';
};

const calculateCanopyCover = (ndvi) => {
  return Math.min(Math.max((ndvi * 100), 0), 100).toFixed(1);
};

export const getPolygons = async () => {
  try {
    const response = await fetch(`${AGRO_BASE_URL}/polygons?appid=${AGRO_API_KEY}`);
    const data = await response.json();
    console.log('Available polygons:', data);
    return data;
  } catch (error) {
    console.error('Get polygons error:', error);
    return [];
  }
};
