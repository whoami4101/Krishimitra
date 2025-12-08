import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLanguage } from '../context/LanguageContext';

export default function FarmerInputScreen() {
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [issue, setIssue] = useState('');
  const [notes, setNotes] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image || !cropType || !issue) {
      Alert.alert(t('missingInfo'), t('addImageCrop'));
      return;
    }
    Alert.alert(t('success'), t('submitSuccess'));
    // Reset form
    setImage(null);
    setCropType('');
    setLocation('');
    setIssue('');
    setNotes('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={32} color="#4CAF50" />
        <Text style={styles.title}>{t('farmerInput')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t('uploadImage')} *</Text>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={64} color="#ccc" />
              <Text style={styles.placeholderText}>{t('noImage')}</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.imageButtonText}>{t('takePhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Ionicons name="images" size={20} color="#fff" />
            <Text style={styles.imageButtonText}>{t('chooseGallery')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t('cropType')} *</Text>
        <TextInput
          style={styles.input}
          placeholder={t('cropPlaceholder')}
          value={cropType}
          onChangeText={setCropType}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t('location')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('locationPlaceholder')}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t('issue')} *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={t('issuePlaceholder')}
          value={issue}
          onChangeText={setIssue}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{t('notes')}</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={t('notesPlaceholder')}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{t('submit')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 10,
    color: '#999',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
