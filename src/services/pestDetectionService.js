// Pest Detection Service - Mock implementation
// Install TensorFlow dependencies later: npm install @tensorflow/tfjs @tensorflow/tfjs-react-native @tensorflow-models/mobilenet

const PEST_DISEASE_CLASSES = {
  0: { name: 'Healthy Leaf', detected: false, severity: 'low', description: 'Plant appears healthy with no visible signs of disease or pest damage.' },
  1: { name: 'Aphid Infestation', detected: true, severity: 'medium', description: 'Small sap-sucking insects causing leaf curling and yellowing.', 
       symptoms: ['Curled or distorted leaves', 'Sticky honeydew on leaves', 'Yellowing foliage'],
       treatment: ['Spray neem oil solution', 'Introduce ladybugs (natural predators)', 'Use insecticidal soap'] },
  2: { name: 'Leaf Blight', detected: true, severity: 'high', description: 'Fungal disease causing brown spots and leaf death.',
       symptoms: ['Brown or black spots on leaves', 'Yellowing around spots', 'Premature leaf drop'],
       treatment: ['Remove infected leaves', 'Apply copper-based fungicide', 'Improve air circulation', 'Avoid overhead watering'] },
  3: { name: 'Powdery Mildew', detected: true, severity: 'medium', description: 'White powdery fungal growth on leaf surfaces.',
       symptoms: ['White powdery coating on leaves', 'Distorted new growth', 'Reduced plant vigor'],
       treatment: ['Apply sulfur-based fungicide', 'Spray baking soda solution', 'Ensure proper spacing', 'Remove affected parts'] },
  4: { name: 'Caterpillar Damage', detected: true, severity: 'medium', description: 'Leaf-eating larvae causing holes and defoliation.',
       symptoms: ['Irregular holes in leaves', 'Visible caterpillars', 'Droppings on leaves'],
       treatment: ['Hand-pick caterpillars', 'Apply Bacillus thuringiensis (Bt)', 'Use neem-based pesticides'] },
  5: { name: 'Rust Disease', detected: true, severity: 'high', description: 'Fungal infection with orange-brown pustules.',
       symptoms: ['Orange or rust-colored spots', 'Leaf yellowing', 'Stunted growth'],
       treatment: ['Remove infected leaves', 'Apply fungicide', 'Improve drainage', 'Rotate crops'] },
};

export const analyzePestDisease = async (imageUri) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock classification - randomly select a pest/disease
  const classId = Math.floor(Math.random() * 6);
  const confidence = 75 + Math.floor(Math.random() * 20);
  
  return {
    ...PEST_DISEASE_CLASSES[classId],
    confidence,
  };
};
