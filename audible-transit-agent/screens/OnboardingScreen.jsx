// // // // // screens/OnboardingScreen.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
// // // // import * as Speech from 'expo-speech';
// // // // import * as Haptics from 'expo-haptics';
// // // // import { Audio } from 'expo-av';
// // // // import axios from 'axios';

// // // // const questions = [
// // // //   { key: 'crowdTolerance', text: 'On a scale of 1 to 10, what is your comfort level with large, noisy crowds?' },
// // // //   { key: 'seatingPreference', text: 'When you board a bus, which area do you prefer: front, middle, or rear?' },
// // // //   { key: 'travelTriggers', text: 'Any specific triggers like smells or broken seats?' },
// // // //   { key: 'timeTolerance', text: 'Max wait time before rerouting?' },
// // // // ];

// // // // const IP = 'IP';
// // // // const GOOGLE_API_KEY = 'API-KEY'; // PASTE HERE

// // // // export default function OnboardingScreen({ navigation, route }) {
// // // //   const userId = route.params?.userId ?? 'test-user';
// // // //   const [idx, setIdx] = useState(0);
// // // //   const [answer, setAnswer] = useState('');
// // // //   const [isRecording, setIsRecording] = useState(false);
// // // //   const [recording, setRecording] = useState(null);

// // // //   useEffect(() => {
// // // //     Speech.speak(questions[idx].text, { rate: 0.9 });
// // // //   }, [idx]);

// // // //   const startRecording = async () => {
// // // //     try {
// // // //       const { status } = await Audio.requestPermissionsAsync();
// // // //       if (status !== 'granted') {
// // // //         Alert.alert('Mic', 'Allow in Settings');
// // // //         return;
// // // //       }

// // // //       await Audio.setAudioModeAsync({
// // // //         allowsRecordingIOS: true,
// // // //         playsInSilentModeIOS: true,
// // // //       });

// // // //       const { recording } = await Audio.Recording.createAsync(
// // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // //       );
// // // //       setRecording(recording);
// // // //       setIsRecording(true);
// // // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // // //     } catch (err) {
// // // //       Alert.alert('Error', 'Recording failed');
// // // //     }
// // // //   };

// // // //   const stopRecording = async () => {
// // // //     if (!recording) return;
// // // //     setIsRecording(false);
// // // //     await recording.stopAndUnloadAsync();
// // // //     const uri = recording.getURI();

// // // //     try {
// // // //       const response = await fetch(uri);
// // // //       const blob = await response.blob();
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = async () => {
// // // //         const base64 = reader.result.split(',')[1];
// // // //         const res = await fetch(
// // // //           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
// // // //           {
// // // //             method: 'POST',
// // // //             headers: { 'Content-Type': 'application/json' },
// // // //             body: JSON.stringify({
// // // //               config: {
// // // //                 encoding: 'WEBM_OPUS',
// // // //                 sampleRateHertz: 48000,
// // // //                 languageCode: 'en-US',
// // // //               },
// // // //               audio: { content: base64 },
// // // //             }),
// // // //           }
// // // //         );
// // // //         const data = await res.json();
// // // //         const text = data.results?.[0]?.alternatives?.[0]?.transcript || 'Nothing heard';
// // // //         setAnswer(text);
// // // //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// // // //       };
// // // //       reader.readAsDataURL(blob);
// // // //     } catch (e) {
// // // //       Alert.alert('STT Error', 'Using fallback');
// // // //       const mockResponses = ['2', 'rear', 'none', '10 minutes'];
// // // //       setAnswer(mockResponses[idx] || '7');
// // // //     }
// // // //     setRecording(null);
// // // //   };

// // // //   const saveAndNext = async () => {
// // // //     const q = questions[idx];
// // // //     try {
// // // //       await axios.post(`http://${IP}:8000/store-preference`, {
// // // //         userId,
// // // //         key: q.key,
// // // //         value: answer || 'skipped',
// // // //       }, {
// // // //         headers: { 'Content-Type': 'application/json' }
// // // //       });
// // // //     } catch (e) {
// // // //       Alert.alert('Save Failed', e.message);
// // // //     }

// // // //     if (idx < questions.length - 1) {
// // // //       setIdx(idx + 1);
// // // //       setAnswer('');
// // // //     } else {
// // // //       Speech.speak('Welcome to VisionaryGuide!');
// // // //       navigation.replace('Landing');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.q}>{questions[idx].text}</Text>
// // // //       <TextInput
// // // //         style={styles.input}
// // // //         value={answer}
// // // //         onChangeText={setAnswer}
// // // //         placeholder="Type here..."
// // // //       />

// // // //       <Pressable
// // // //         style={({ pressed }) => [
// // // //           styles.micButton,
// // // //           pressed && styles.micPressed,
// // // //           isRecording && styles.micRecording
// // // //         ]}
// // // //         onLongPress={startRecording}
// // // //         onPressOut={stopRecording}
// // // //         disabled={isRecording}
// // // //       >
// // // //         <Text style={styles.micText}>
// // // //           {isRecording ? 'Recording...' : 'Hold to Speak'}
// // // //         </Text>
// // // //       </Pressable>

// // // //       <Pressable
// // // //         style={({ pressed }) => [styles.nextButton, pressed && styles.nextPressed]}
// // // //         onPress={saveAndNext}
// // // //       >
// // // //         <Text style={styles.nextText}>Next</Text>
// // // //       </Pressable>
// // // //     </View>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, justifyContent: 'center', padding: 24 },
// // // //   q: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
// // // //   input: { borderWidth: 1, padding: 12, marginVertical: 12, borderRadius: 8 },
// // // //   micButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 50, marginVertical: 10 },
// // // //   micPressed: { backgroundColor: '#0056b3', transform: [{ scale: 0.95 }] },
// // // //   micRecording: { backgroundColor: '#FF3B30' },
// // // //   micText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
// // // //   nextButton: { backgroundColor: '#34C759', padding: 16, borderRadius: 50, marginTop: 10 },
// // // //   nextPressed: { backgroundColor: '#2a9d4f', transform: [{ scale: 0.95 }] },
// // // //   nextText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
// // // // });

// // // // screens/OnboardingScreen.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView, AccessibilityInfo } from 'react-native';
// // // // import * as Speech from 'expo-speech';
// // // // import * as Haptics from 'expo-haptics';
// // // // import { Audio } from 'expo-av';
// // // // import axios from 'axios';

// // // // const questions = [
// // // //   { key: 'crowdTolerance', text: 'On a scale of 1 to 10, what is your comfort level with large, noisy crowds?' },
// // // //   { key: 'seatingPreference', text: 'When you board a bus, which area do you prefer: front, middle, or rear?' },
// // // //   { key: 'travelTriggers', text: 'Any specific triggers like smells or broken seats?' },
// // // //   { key: 'timeTolerance', text: 'Max wait time before rerouting?' },
// // // // ];

// // // // const IP = 'IP';
// // // // const GOOGLE_API_KEY = 'API-KEY';

// // // // export default function OnboardingScreen({ navigation, route }) {
// // // //   const userId = route.params?.userId ?? 'test-user';
// // // //   const [idx, setIdx] = useState(0);
// // // //   const [answer, setAnswer] = useState('');
// // // //   const [isRecording, setIsRecording] = useState(false);
// // // //   const [recording, setRecording] = useState(null);

// // // //   useEffect(() => {
// // // //     Speech.speak(questions[idx].text, { rate: 0.9 });
// // // //     // Announce progress for screen readers
// // // //     AccessibilityInfo.announceForAccessibility(
// // // //       `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
// // // //     );
// // // //   }, [idx]);

// // // //   const startRecording = async () => {
// // // //     try {
// // // //       const { status } = await Audio.requestPermissionsAsync();
// // // //       if (status !== 'granted') {
// // // //         Alert.alert('Microphone Access', 'Please allow microphone access in Settings to use voice input.');
// // // //         return;
// // // //       }

// // // //       await Audio.setAudioModeAsync({
// // // //         allowsRecordingIOS: true,
// // // //         playsInSilentModeIOS: true,
// // // //       });

// // // //       const { recording } = await Audio.Recording.createAsync(
// // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // //       );
// // // //       setRecording(recording);
// // // //       setIsRecording(true);
// // // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // // //       AccessibilityInfo.announceForAccessibility('Recording started');
// // // //     } catch (err) {
// // // //       Alert.alert('Error', 'Recording failed. Please try again.');
// // // //     }
// // // //   };

// // // //   const stopRecording = async () => {
// // // //     if (!recording) return;
// // // //     setIsRecording(false);
// // // //     await recording.stopAndUnloadAsync();
// // // //     const uri = recording.getURI();

// // // //     try {
// // // //       const response = await fetch(uri);
// // // //       const blob = await response.blob();
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = async () => {
// // // //         const base64 = reader.result.split(',')[1];
// // // //         const res = await fetch(
// // // //           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
// // // //           {
// // // //             method: 'POST',
// // // //             headers: { 'Content-Type': 'application/json' },
// // // //             body: JSON.stringify({
// // // //               config: {
// // // //                 encoding: 'WEBM_OPUS',
// // // //                 sampleRateHertz: 48000,
// // // //                 languageCode: 'en-US',
// // // //               },
// // // //               audio: { content: base64 },
// // // //             }),
// // // //           }
// // // //         );
// // // //         const data = await res.json();
// // // //         const text = data.results?.[0]?.alternatives?.[0]?.transcript || 'Nothing heard';
// // // //         setAnswer(text);
// // // //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// // // //         AccessibilityInfo.announceForAccessibility(`Recognized: ${text}`);
// // // //       };
// // // //       reader.readAsDataURL(blob);
// // // //     } catch (e) {
// // // //       Alert.alert('Speech Recognition Error', 'Using fallback response');
// // // //       const mockResponses = ['2', 'rear', 'none', '10 minutes'];
// // // //       setAnswer(mockResponses[idx] || '7');
// // // //     }
// // // //     setRecording(null);
// // // //   };

// // // //   const saveAndNext = async () => {
// // // //     const q = questions[idx];

// // // //     if (!answer.trim()) {
// // // //       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await axios.post(`http://${IP}:8000/store-preference`, {
// // // //         userId,
// // // //         key: q.key,
// // // //         value: answer || 'skipped',
// // // //       }, {
// // // //         headers: { 'Content-Type': 'application/json' }
// // // //       });

// // // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // // //     } catch (e) {
// // // //       Alert.alert('Save Failed', e.message);
// // // //       return;
// // // //     }

// // // //     if (idx < questions.length - 1) {
// // // //       setIdx(idx + 1);
// // // //       setAnswer('');
// // // //     } else {
// // // //       Speech.speak('Welcome to VisionaryGuide! Setup complete.');
// // // //       navigation.replace('Landing');
// // // //     }
// // // //   };

// // // //   const progress = ((idx + 1) / questions.length) * 100;

// // // //   return (
// // // //     <ScrollView 
// // // //       contentContainerStyle={styles.scrollContainer}
// // // //       accessible={true}
// // // //       accessibilityLabel="Onboarding questionnaire"
// // // //     >
// // // //       <View style={styles.container}>
// // // //         {/* Header */}
// // // //         <View style={styles.header}>
// // // //           <Text 
// // // //             style={styles.logo}
// // // //             accessible={true}
// // // //             accessibilityRole="header"
// // // //             accessibilityLabel="VisionaryGuide Setup"
// // // //           >
// // // //             VisionaryGuide
// // // //           </Text>
// // // //           <Text 
// // // //             style={styles.subtitle}
// // // //             accessible={true}
// // // //             accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}
// // // //           >
// // // //             Let's personalize your experience
// // // //           </Text>
// // // //         </View>

// // // //         {/* Progress Bar */}
// // // //         <View 
// // // //           style={styles.progressContainer}
// // // //           accessible={true}
// // // //           accessibilityRole="progressbar"
// // // //           accessibilityLabel={`Progress: ${Math.round(progress)}% complete`}
// // // //           accessibilityValue={{ now: progress, min: 0, max: 100 }}
// // // //         >
// // // //           <View style={styles.progressBar}>
// // // //             <View style={[styles.progressFill, { width: `${progress}%` }]} />
// // // //           </View>
// // // //           <Text style={styles.progressText}>
// // // //             {idx + 1} / {questions.length}
// // // //           </Text>
// // // //         </View>

// // // //         {/* Question Card */}
// // // //         <View style={styles.questionCard}>
// // // //           <Text 
// // // //             style={styles.questionLabel}
// // // //             accessible={true}
// // // //             accessibilityRole="text"
// // // //           >
// // // //             Question {idx + 1}
// // // //           </Text>
// // // //           <Text 
// // // //             style={styles.questionText}
// // // //             accessible={true}
// // // //             accessibilityRole="text"
// // // //             accessibilityLabel={questions[idx].text}
// // // //           >
// // // //             {questions[idx].text}
// // // //           </Text>
// // // //         </View>

// // // //         {/* Answer Input */}
// // // //         <View style={styles.inputContainer}>
// // // //           <Text 
// // // //             style={styles.inputLabel}
// // // //             accessible={true}
// // // //           >
// // // //             Your Answer
// // // //           </Text>
// // // //           <TextInput
// // // //             style={styles.input}
// // // //             value={answer}
// // // //             onChangeText={setAnswer}
// // // //             placeholder="Type your answer here..."
// // // //             placeholderTextColor="#999"
// // // //             accessible={true}
// // // //             accessibilityLabel="Answer input field"
// // // //             accessibilityHint="Enter your answer or use voice input below"
// // // //             multiline
// // // //             numberOfLines={3}
// // // //           />
// // // //         </View>

// // // //         {/* Voice Input Button */}
// // // //         <Pressable
// // // //           style={({ pressed }) => [
// // // //             styles.micButton,
// // // //             pressed && styles.micPressed,
// // // //             isRecording && styles.micRecording
// // // //           ]}
// // // //           onLongPress={startRecording}
// // // //           onPressOut={stopRecording}
// // // //           disabled={isRecording}
// // // //           accessible={true}
// // // //           accessibilityRole="button"
// // // //           accessibilityLabel={isRecording ? 'Recording in progress' : 'Hold to record voice answer'}
// // // //           accessibilityHint="Press and hold to speak your answer, release when done"
// // // //           accessibilityState={{ disabled: isRecording }}
// // // //         >
// // // //           <View style={styles.micButtonContent}>
// // // //             <View style={styles.micIcon}>
// // // //               <Text style={styles.micIconText}>🎤</Text>
// // // //             </View>
// // // //             <Text style={styles.micText}>
// // // //               {isRecording ? 'Recording...' : 'Hold to Speak'}
// // // //             </Text>
// // // //           </View>
// // // //         </Pressable>

// // // //         {/* Navigation Buttons */}
// // // //         <View style={styles.buttonRow}>
// // // //           <Pressable
// // // //             style={({ pressed }) => [
// // // //               styles.nextButton,
// // // //               pressed && styles.nextPressed
// // // //             ]}
// // // //             onPress={saveAndNext}
// // // //             accessible={true}
// // // //             accessibilityRole="button"
// // // //             accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
// // // //             accessibilityHint="Saves your answer and continues"
// // // //           >
// // // //             <Text style={styles.nextText}>
// // // //               {idx < questions.length - 1 ? 'Next' : 'Complete'}
// // // //             </Text>
// // // //           </Pressable>
// // // //         </View>

// // // //         {/* Helper Text */}
// // // //         <Text 
// // // //           style={styles.helperText}
// // // //           accessible={true}
// // // //           accessibilityRole="text"
// // // //         >
// // // //           💡 Tip: Hold the microphone button and speak naturally
// // // //         </Text>
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   scrollContainer: {
// // // //     flexGrow: 1,
// // // //     backgroundColor: '#F8F9FA',
// // // //   },
// // // //   container: {
// // // //     flex: 1,
// // // //     padding: 24,
// // // //     paddingTop: 60,
// // // //   },
// // // //   header: {
// // // //     marginBottom: 32,
// // // //     alignItems: 'center',
// // // //   },
// // // //   logo: {
// // // //     fontSize: 32,
// // // //     fontWeight: '800',
// // // //     color: '#1A1A1A',
// // // //     marginBottom: 8,
// // // //     letterSpacing: 0.5,
// // // //   },
// // // //   subtitle: {
// // // //     fontSize: 16,
// // // //     color: '#666',
// // // //     textAlign: 'center',
// // // //   },
// // // //   progressContainer: {
// // // //     marginBottom: 32,
// // // //   },
// // // //   progressBar: {
// // // //     height: 8,
// // // //     backgroundColor: '#E0E0E0',
// // // //     borderRadius: 4,
// // // //     overflow: 'hidden',
// // // //     marginBottom: 8,
// // // //   },
// // // //   progressFill: {
// // // //     height: '100%',
// // // //     backgroundColor: '#007AFF',
// // // //     borderRadius: 4,
// // // //   },
// // // //   progressText: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     textAlign: 'right',
// // // //     fontWeight: '600',
// // // //   },
// // // //   questionCard: {
// // // //     backgroundColor: '#FFFFFF',
// // // //     borderRadius: 16,
// // // //     padding: 24,
// // // //     marginBottom: 24,
// // // //     shadowColor: '#000',
// // // //     shadowOffset: { width: 0, height: 2 },
// // // //     shadowOpacity: 0.08,
// // // //     shadowRadius: 8,
// // // //     elevation: 3,
// // // //   },
// // // //   questionLabel: {
// // // //     fontSize: 14,
// // // //     color: '#007AFF',
// // // //     fontWeight: '700',
// // // //     marginBottom: 12,
// // // //     letterSpacing: 0.5,
// // // //     textTransform: 'uppercase',
// // // //   },
// // // //   questionText: {
// // // //     fontSize: 20,
// // // //     color: '#1A1A1A',
// // // //     lineHeight: 28,
// // // //     fontWeight: '600',
// // // //   },
// // // //   inputContainer: {
// // // //     marginBottom: 24,
// // // //   },
// // // //   inputLabel: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     fontWeight: '600',
// // // //     marginBottom: 8,
// // // //   },
// // // //   input: {
// // // //     backgroundColor: '#FFFFFF',
// // // //     borderWidth: 2,
// // // //     borderColor: '#E0E0E0',
// // // //     padding: 16,
// // // //     borderRadius: 12,
// // // //     fontSize: 16,
// // // //     minHeight: 80,
// // // //     textAlignVertical: 'top',
// // // //     color: '#1A1A1A',
// // // //   },
// // // //   micButton: {
// // // //     backgroundColor: '#FF9500',
// // // //     borderRadius: 16,
// // // //     marginBottom: 16,
// // // //     shadowColor: '#FF9500',
// // // //     shadowOffset: { width: 0, height: 4 },
// // // //     shadowOpacity: 0.3,
// // // //     shadowRadius: 8,
// // // //     elevation: 6,
// // // //   },
// // // //   micPressed: {
// // // //     backgroundColor: '#CC7700',
// // // //     transform: [{ scale: 0.97 }],
// // // //   },
// // // //   micRecording: {
// // // //     backgroundColor: '#FF3B30',
// // // //     shadowColor: '#FF3B30',
// // // //   },
// // // //   micButtonContent: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //     padding: 18,
// // // //   },
// // // //   micIcon: {
// // // //     width: 40,
// // // //     height: 40,
// // // //     borderRadius: 20,
// // // //     backgroundColor: 'rgba(255,255,255,0.2)',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //     marginRight: 12,
// // // //   },
// // // //   micIconText: {
// // // //     fontSize: 20,
// // // //   },
// // // //   micText: {
// // // //     color: '#FFFFFF',
// // // //     fontWeight: '700',
// // // //     fontSize: 18,
// // // //   },
// // // //   buttonRow: {
// // // //     flexDirection: 'row',
// // // //     marginBottom: 16,
// // // //   },
// // // //   nextButton: {
// // // //     flex: 1,
// // // //     backgroundColor: '#34C759',
// // // //     padding: 18,
// // // //     borderRadius: 16,
// // // //     alignItems: 'center',
// // // //     shadowColor: '#34C759',
// // // //     shadowOffset: { width: 0, height: 4 },
// // // //     shadowOpacity: 0.3,
// // // //     shadowRadius: 8,
// // // //     elevation: 6,
// // // //   },
// // // //   nextPressed: {
// // // //     backgroundColor: '#2a9d4f',
// // // //     transform: [{ scale: 0.97 }],
// // // //   },
// // // //   nextText: {
// // // //     color: '#FFFFFF',
// // // //     fontWeight: '700',
// // // //     fontSize: 18,
// // // //   },
// // // //   helperText: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     textAlign: 'center',
// // // //     fontStyle: 'italic',
// // // //   },
// // // // });

// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView, AccessibilityInfo } from 'react-native';
// // // // import * as Speech from 'expo-speech';
// // // // import * as Haptics from 'expo-haptics';
// // // // import { Audio } from 'expo-av';
// // // // import axios from 'axios';

// // // // const questions = [
// // // //   {
// // // //     key: 'crowdTolerance',
// // // //     text: 'How sensitive are you to crowded spaces? Choose: High (prefer quiet), Medium, or Low (crowds are fine).'
// // // //   },
// // // //   {
// // // //     key: 'seatingPreference',
// // // //     text: 'When you board a bus, which area do you prefer: front, middle, or rear?'
// // // //   },
// // // //   {
// // // //     key: 'conditionTriggers', // 👈 KEY CHANGE
// // // //     text: 'Are you concerned about bus condition? Example, broken seats, visible trash, or loud engine noise.' // 👈 TEXT CHANGE (Focusing on visual/audible issues)
// // // //   },
// // // //   {
// // // //     key: 'detailLevel',
// // // //     text: 'How detailed should my descriptions be? Choose: Short (just the fact), or Detailed (include safety and context).'
// // // //   },
// // // // ];

// // // // const IP = 'IP';
// // // // const GOOGLE_API_KEY = 'API-KEY';

// // // // export default function OnboardingScreen({ navigation, route }) {
// // // //   const userId = route.params?.userId ?? 'test-user';
// // // //   const [idx, setIdx] = useState(0);
// // // //   const [answer, setAnswer] = useState('');
// // // //   const [isRecording, setIsRecording] = useState(false);
// // // //   const [recording, setRecording] = useState(null);

// // // //   useEffect(() => {
// // // //     Speech.speak(questions[idx].text, { rate: 0.9 });
// // // //     // Announce progress for screen readers
// // // //     AccessibilityInfo.announceForAccessibility(
// // // //       `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
// // // //     );
// // // //   }, [idx]);

// // // //   const startRecording = async () => {
// // // //     try {
// // // //       const { status } = await Audio.requestPermissionsAsync();
// // // //       if (status !== 'granted') {
// // // //         Alert.alert('Microphone Access', 'Please allow microphone access in Settings to use voice input.');
// // // //         return;
// // // //       }

// // // //       await Audio.setAudioModeAsync({
// // // //         allowsRecordingIOS: true,
// // // //         playsInSilentModeIOS: true,
// // // //       });

// // // //       const { recording } = await Audio.Recording.createAsync(
// // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // //       );
// // // //       setRecording(recording);
// // // //       setIsRecording(true);
// // // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // // //       AccessibilityInfo.announceForAccessibility('Recording started');
// // // //     } catch (err) {
// // // //       Alert.alert('Error', 'Recording failed. Please try again.');
// // // //     }
// // // //   };

// // // //   const stopRecording = async () => {
// // // //     if (!recording) return;
// // // //     setIsRecording(false);
// // // //     await recording.stopAndUnloadAsync();
// // // //     const uri = recording.getURI();

// // // //     try {
// // // //       const response = await fetch(uri);
// // // //       const blob = await response.blob();
// // // //       const reader = new FileReader();
// // // //       reader.onloadend = async () => {
// // // //         const base64 = reader.result.split(',')[1];
// // // //         const res = await fetch(
// // // //           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
// // // //           {
// // // //             method: 'POST',
// // // //             headers: { 'Content-Type': 'application/json' },
// // // //             body: JSON.stringify({
// // // //               config: {
// // // //                 encoding: 'WEBM_OPUS',
// // // //                 sampleRateHertz: 48000,
// // // //                 languageCode: 'en-US',
// // // //               },
// // // //               audio: { content: base64 },
// // // //             }),
// // // //           }
// // // //         );
// // // //         const data = await res.json();
// // // //         const text = data.results?.[0]?.alternatives?.[0]?.transcript || 'Nothing heard';
// // // //         setAnswer(text);
// // // //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// // // //         AccessibilityInfo.announceForAccessibility(`Recognized: ${text}`);
// // // //       };
// // // //       reader.readAsDataURL(blob);
// // // //     } catch (e) {
// // // //       Alert.alert('Speech Recognition Error', 'Using fallback response');
// // // //       // Adjusted mock responses to fit new question types
// // // //       const mockResponses = ['low', 'rear', 'loud noises', 'Detailed'];
// // // //       setAnswer(mockResponses[idx] || 'Medium');
// // // //     }
// // // //     setRecording(null);
// // // //   };

// // // //   const saveAndNext = async () => {
// // // //     const q = questions[idx];

// // // //     if (!answer.trim()) {
// // // //       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await axios.post(`http://${IP}:8000/store-preference`, {
// // // //         userId,
// // // //         key: q.key,
// // // //         // Normalize answer case before sending to backend for consistency
// // // //         value: (answer || 'skipped').toLowerCase().trim(),
// // // //       }, {
// // // //         headers: { 'Content-Type': 'application/json' }
// // // //       });

// // // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // // //     } catch (e) {
// // // //       Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
// // // //       return;
// // // //     }

// // // //     if (idx < questions.length - 1) {
// // // //       setIdx(idx + 1);
// // // //       setAnswer('');
// // // //     } else {
// // // //       Speech.speak('Welcome to VisionaryGuide! Setup complete.');
// // // //       navigation.replace('Landing');
// // // //     }
// // // //   };

// // // //   const progress = ((idx + 1) / questions.length) * 100;

// // // //   return (
// // // //     <ScrollView
// // // //       contentContainerStyle={styles.scrollContainer}
// // // //       accessible={true}
// // // //       accessibilityLabel="Onboarding questionnaire"
// // // //     >
// // // //       <View style={styles.container}>
// // // //         {/* Header */}
// // // //         <View style={styles.header}>
// // // //           <Text
// // // //             style={styles.logo}
// // // //             accessible={true}
// // // //             accessibilityRole="header"
// // // //             accessibilityLabel="VisionaryGuide Setup"
// // // //           >
// // // //             VisionaryGuide
// // // //           </Text>
// // // //           <Text
// // // //             style={styles.subtitle}
// // // //             accessible={true}
// // // //             accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}
// // // //           >
// // // //             Let's personalize your experience
// // // //           </Text>
// // // //         </View>

// // // //         {/* Progress Bar */}
// // // //         <View
// // // //           style={styles.progressContainer}
// // // //           accessible={true}
// // // //           accessibilityRole="progressbar"
// // // //           accessibilityLabel={`Progress: ${Math.round(progress)}% complete`}
// // // //           accessibilityValue={{ now: progress, min: 0, max: 100 }}
// // // //         >
// // // //           <View style={styles.progressBar}>
// // // //             <View style={[styles.progressFill, { width: `${progress}%` }]} />
// // // //           </View>
// // // //           <Text style={styles.progressText}>
// // // //             {idx + 1} / {questions.length}
// // // //           </Text>
// // // //         </View>

// // // //         {/* Question Card */}
// // // //         <View style={styles.questionCard}>
// // // //           <Text
// // // //             style={styles.questionLabel}
// // // //             accessible={true}
// // // //             accessibilityRole="text"
// // // //           >
// // // //             Question {idx + 1}
// // // //           </Text>
// // // //           <Text
// // // //             style={styles.questionText}
// // // //             accessible={true}
// // // //             accessibilityRole="text"
// // // //             accessibilityLabel={questions[idx].text}
// // // //           >
// // // //             {questions[idx].text}
// // // //           </Text>
// // // //         </View>

// // // //         {/* Answer Input */}
// // // //         <View style={styles.inputContainer}>
// // // //           <Text
// // // //             style={styles.inputLabel}
// // // //             accessible={true}
// // // //           >
// // // //             Your Answer
// // // //           </Text>
// // // //           <TextInput
// // // //             style={styles.input}
// // // //             value={answer}
// // // //             onChangeText={setAnswer}
// // // //             placeholder="Type your answer here..."
// // // //             placeholderTextColor="#999"
// // // //             accessible={true}
// // // //             accessibilityLabel="Answer input field"
// // // //             accessibilityHint="Enter your answer or use voice input below"
// // // //             multiline
// // // //             numberOfLines={3}
// // // //           />
// // // //         </View>

// // // //         {/* Voice Input Button */}
// // // //         <Pressable
// // // //           style={({ pressed }) => [
// // // //             styles.micButton,
// // // //             pressed && styles.micPressed,
// // // //             isRecording && styles.micRecording
// // // //           ]}
// // // //           onLongPress={startRecording}
// // // //           onPressOut={stopRecording}
// // // //           disabled={isRecording}
// // // //           accessible={true}
// // // //           accessibilityRole="button"
// // // //           accessibilityLabel={isRecording ? 'Recording in progress' : 'Hold to record voice answer'}
// // // //           accessibilityHint="Press and hold to speak your answer, release when done"
// // // //           accessibilityState={{ disabled: isRecording }}
// // // //         >
// // // //           <View style={styles.micButtonContent}>
// // // //             <View style={styles.micIcon}>
// // // //               <Text style={styles.micIconText}>🎤</Text>
// // // //             </View>
// // // //             <Text style={styles.micText}>
// // // //               {isRecording ? 'Recording...' : 'Hold to Speak'}
// // // //             </Text>
// // // //           </View>
// // // //         </Pressable>

// // // //         {/* Navigation Buttons */}
// // // //         <View style={styles.buttonRow}>
// // // //           <Pressable
// // // //             style={({ pressed }) => [
// // // //               styles.nextButton,
// // // //               pressed && styles.nextPressed
// // // //             ]}
// // // //             onPress={saveAndNext}
// // // //             accessible={true}
// // // //             accessibilityRole="button"
// // // //             accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
// // // //             accessibilityHint="Saves your answer and continues"
// // // //           >
// // // //             <Text style={styles.nextText}>
// // // //               {idx < questions.length - 1 ? 'Next' : 'Complete'}
// // // //             </Text>
// // // //           </Pressable>
// // // //         </View>

// // // //         {/* Helper Text */}
// // // //         <Text
// // // //           style={styles.helperText}
// // // //           accessible={true}
// // // //           accessibilityRole="text"
// // // //         >
// // // //           💡 Tip: Hold the microphone button and speak naturally
// // // //         </Text>
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   // ... (All styles remain completely unchanged as requested) ...
// // // //   scrollContainer: {
// // // //     flexGrow: 1,
// // // //     backgroundColor: '#F8F9FA',
// // // //   },
// // // //   container: {
// // // //     flex: 1,
// // // //     padding: 24,
// // // //     paddingTop: 60,
// // // //   },
// // // //   header: {
// // // //     marginBottom: 32,
// // // //     alignItems: 'center',
// // // //   },
// // // //   logo: {
// // // //     fontSize: 32,
// // // //     fontWeight: '800',
// // // //     color: '#1A1A1A',
// // // //     marginBottom: 8,
// // // //     letterSpacing: 0.5,
// // // //   },
// // // //   subtitle: {
// // // //     fontSize: 16,
// // // //     color: '#666',
// // // //     textAlign: 'center',
// // // //   },
// // // //   progressContainer: {
// // // //     marginBottom: 32,
// // // //   },
// // // //   progressBar: {
// // // //     height: 8,
// // // //     backgroundColor: '#E0E0E0',
// // // //     borderRadius: 4,
// // // //     overflow: 'hidden',
// // // //     marginBottom: 8,
// // // //   },
// // // //   progressFill: {
// // // //     height: '100%',
// // // //     backgroundColor: '#007AFF',
// // // //     borderRadius: 4,
// // // //   },
// // // //   progressText: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     textAlign: 'right',
// // // //     fontWeight: '600',
// // // //   },
// // // //   questionCard: {
// // // //     backgroundColor: '#FFFFFF',
// // // //     borderRadius: 16,
// // // //     padding: 24,
// // // //     marginBottom: 24,
// // // //     shadowColor: '#000',
// // // //     shadowOffset: { width: 0, height: 2 },
// // // //     shadowOpacity: 0.08,
// // // //     shadowRadius: 8,
// // // //     elevation: 3,
// // // //   },
// // // //   questionLabel: {
// // // //     fontSize: 14,
// // // //     color: '#007AFF',
// // // //     fontWeight: '700',
// // // //     marginBottom: 12,
// // // //     letterSpacing: 0.5,
// // // //     textTransform: 'uppercase',
// // // //   },
// // // //   questionText: {
// // // //     fontSize: 20,
// // // //     color: '#1A1A1A',
// // // //     lineHeight: 28,
// // // //     fontWeight: '600',
// // // //   },
// // // //   inputContainer: {
// // // //     marginBottom: 24,
// // // //   },
// // // //   inputLabel: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     fontWeight: '600',
// // // //     marginBottom: 8,
// // // //   },
// // // //   input: {
// // // //     backgroundColor: '#FFFFFF',
// // // //     borderWidth: 2,
// // // //     borderColor: '#E0E0E0',
// // // //     padding: 16,
// // // //     borderRadius: 12,
// // // //     fontSize: 16,
// // // //     minHeight: 80,
// // // //     textAlignVertical: 'top',
// // // //     color: '#1A1A1A',
// // // //   },
// // // //   micButton: {
// // // //     backgroundColor: '#FF9500',
// // // //     borderRadius: 16,
// // // //     marginBottom: 16,
// // // //     shadowColor: '#FF9500',
// // // //     shadowOffset: { width: 0, height: 4 },
// // // //     shadowOpacity: 0.3,
// // // //     shadowRadius: 8,
// // // //     elevation: 6,
// // // //   },
// // // //   micPressed: {
// // // //     backgroundColor: '#CC7700',
// // // //     transform: [{ scale: 0.97 }],
// // // //   },
// // // //   micRecording: {
// // // //     backgroundColor: '#FF3B30',
// // // //     shadowColor: '#FF3B30',
// // // //   },
// // // //   micButtonContent: {
// // // //     flexDirection: 'row',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //     padding: 18,
// // // //   },
// // // //   micIcon: {
// // // //     width: 40,
// // // //     height: 40,
// // // //     borderRadius: 20,
// // // //     backgroundColor: 'rgba(255,255,255,0.2)',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //     marginRight: 12,
// // // //   },
// // // //   micIconText: {
// // // //     fontSize: 20,
// // // //   },
// // // //   micText: {
// // // //     color: '#FFFFFF',
// // // //     fontWeight: '700',
// // // //     fontSize: 18,
// // // //   },
// // // //   buttonRow: {
// // // //     flexDirection: 'row',
// // // //     marginBottom: 16,
// // // //   },
// // // //   nextButton: {
// // // //     flex: 1,
// // // //     backgroundColor: '#34C759',
// // // //     padding: 18,
// // // //     borderRadius: 16,
// // // //     alignItems: 'center',
// // // //     shadowColor: '#34C759',
// // // //     shadowOffset: { width: 0, height: 4 },
// // // //     shadowOpacity: 0.3,
// // // //     shadowRadius: 8,
// // // //     elevation: 6,
// // // //   },
// // // //   nextPressed: {
// // // //     backgroundColor: '#2a9d4f',
// // // //     transform: [{ scale: 0.97 }],
// // // //   },
// // // //   nextText: {
// // // //     color: '#FFFFFF',
// // // //     fontWeight: '700',
// // // //     fontSize: 18,
// // // //   },
// // // //   helperText: {
// // // //     fontSize: 14,
// // // //     color: '#666',
// // // //     textAlign: 'center',
// // // //     fontStyle: 'italic',
// // // //   },
// // // // });

// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView, AccessibilityInfo } from 'react-native';
// // // import * as Speech from 'expo-speech';
// // // import * as Haptics from 'expo-haptics';
// // // import { Audio } from 'expo-av';
// // // import axios from 'axios';

// // // const questions = [
// // //   {
// // //     key: 'crowdTolerance',
// // //     text: 'How sensitive are you to crowded spaces? Choose: High (prefer quiet), Medium, or Low (crowds are fine).'
// // //   },
// // //   {
// // //     key: 'seatingPreference',
// // //     text: 'When you board a bus, which area do you prefer: front, middle, or rear?'
// // //   },
// // //   {
// // //     key: 'conditionTriggers', // 👈 KEY CHANGE
// // //     text: 'Are you concerned about bus condition? Example, broken seats, visible trash, or loud engine noise.' // 👈 TEXT CHANGE (Focusing on visual/audible issues)
// // //   },
// // //   {
// // //     key: 'detailLevel',
// // //     text: 'How detailed should my descriptions be? Choose: Short (just the fact), or Detailed (include safety and context).'
// // //   },
// // // ];

// // // const IP = 'IP';
// // // const GOOGLE_API_KEY = 'API-KEY';

// // // export default function OnboardingScreen({ navigation, route }) {
// // //   const userId = route.params?.userId ?? 'test-user';
// // //   const [idx, setIdx] = useState(0);
// // //   const [answer, setAnswer] = useState('');
// // //   const [isRecording, setIsRecording] = useState(false);
// // //   const [recording, setRecording] = useState(null);
// // //   const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false); // 👈 NEW STATE

// // //   useEffect(() => {
// // //     // Only speak the question when NOT in confirmation state
// // //     if (!isAwaitingConfirmation) {
// // //       Speech.speak(questions[idx].text, { rate: 0.9 });
// // //       // Announce progress for screen readers
// // //       AccessibilityInfo.announceForAccessibility(
// // //         `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
// // //       );
// // //     }
// // //   }, [idx, isAwaitingConfirmation]); // 👈 Added isAwaitingConfirmation dependency

// // //   const startRecording = async () => {
// // //     if (isAwaitingConfirmation) return; // Prevent recording during confirmation

// // //     try {
// // //       const { status } = await Audio.requestPermissionsAsync();
// // //       if (status !== 'granted') {
// // //         Alert.alert('Microphone Access', 'Please allow microphone access in Settings to use voice input.');
// // //         return;
// // //       }

// // //       await Audio.setAudioModeAsync({
// // //         allowsRecordingIOS: true,
// // //         playsInSilentModeIOS: true,
// // //       });

// // //       const { recording } = await Audio.Recording.createAsync(
// // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // //       );
// // //       setRecording(recording);
// // //       setIsRecording(true);
// // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // //       AccessibilityInfo.announceForAccessibility('Recording started');
// // //     } catch (err) {
// // //       Alert.alert('Error', 'Recording failed. Please try again.');
// // //     }
// // //   };

// // //   const stopRecording = async () => {
// // //     if (!recording) return;
// // //     setIsRecording(false);
// // //     await recording.stopAndUnloadAsync();
// // //     const uri = recording.getURI();

// // //     try {
// // //       const response = await fetch(uri);
// // //       const blob = await response.blob();
// // //       const reader = new FileReader();
// // //       reader.onloadend = async () => {
// // //         const base64 = reader.result.split(',')[1];
// // //         const res = await fetch(
// // //           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
// // //           {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({
// // //               config: {
// // //                 encoding: 'WEBM_OPUS',
// // //                 sampleRateHertz: 48000,
// // //                 languageCode: 'en-US',
// // //               },
// // //               audio: { content: base64 },
// // //             }),
// // //           }
// // //         );
// // //         const data = await res.json();
// // //         const text = (data.results?.[0]?.alternatives?.[0]?.transcript || 'Nothing heard').trim();

// // //         // ----------------------------------------------------
// // //         // 👇 NEW LOGIC: Enter confirmation state
// // //         // ----------------------------------------------------
// // //         setAnswer(text); // Temporarily set answer for confirmation
// // //         setIsAwaitingConfirmation(true);
// // //         Speech.speak(`I heard, "${text}". Do you want to save this answer?`);
// // //         // ----------------------------------------------------

// // //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// // //         AccessibilityInfo.announceForAccessibility(`Recognized: ${text}. Awaiting confirmation.`);
// // //       };
// // //       reader.readAsDataURL(blob);
// // //     } catch (e) {
// // //       Alert.alert('Speech Recognition Error', 'Using fallback response');
// // //       // Adjusted mock responses to fit new question types
// // //       const mockResponses = ['low', 'rear', 'loud noises', 'Detailed'];
// // //       const mockAnswer = mockResponses[idx] || 'Medium';

// // //       setAnswer(mockAnswer);
// // //       setIsAwaitingConfirmation(true);
// // //       Speech.speak(`I suggest the answer, "${mockAnswer}". Do you want to save this answer?`);
// // //     }
// // //     setRecording(null);
// // //   };

// // //   // ----------------------------------------------------
// // //   // 👇 NEW CONFIRMATION HANDLERS
// // //   // ----------------------------------------------------

// // //   const confirmAnswer = () => {
// // //     // If the user clicks confirm, they proceed to save and next
// // //     setIsAwaitingConfirmation(false);
// // //     // The answer state is already set by stopRecording
// // //     saveAndNext();
// // //   };

// // //   const cancelAndReanswer = () => {
// // //     // If the user wants to re-answer, clear the answer and reset state
// // //     setIsAwaitingConfirmation(false);
// // //     setAnswer('');
// // //     Speech.speak(`Please re-answer the question: ${questions[idx].text}`);
// // //     AccessibilityInfo.announceForAccessibility("Answer cancelled. Please record again.");
// // //   };

// // //   // ----------------------------------------------------
// // //   // 👇 MODIFIED saveAndNext - Now only saves the current state
// // //   // ----------------------------------------------------

// // //   const saveAndNext = async () => {
// // //     const q = questions[idx];

// // //     // The text input and saveAndNext will still work manually without confirmation
// // //     if (!answer.trim()) {
// // //       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post(`http://${IP}:8000/store-preference`, {
// // //         userId,
// // //         key: q.key,
// // //         // Normalize answer case before sending to backend for consistency
// // //         value: (answer || 'skipped').toLowerCase().trim(),
// // //       }, {
// // //         headers: { 'Content-Type': 'application/json' }
// // //       });

// // //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// // //     } catch (e) {
// // //       Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
// // //       return;
// // //     }

// // //     if (idx < questions.length - 1) {
// // //       setIdx(idx + 1);
// // //       setAnswer('');
// // //     } else {
// // //       Speech.speak('Welcome to VisionaryGuide! Setup complete.');
// // //       navigation.replace('Landing', { userId }); // Pass userId to LandingScreen
// // //     }
// // //   };

// // //   const progress = ((idx + 1) / questions.length) * 100;

// // //   // ----------------------------------------------------
// // //   // 👇 NEW CONDITIONAL RENDER FOR CONFIRMATION SCREEN
// // //   // ----------------------------------------------------
// // //   if (isAwaitingConfirmation) {
// // //     return (
// // //       <View style={[styles.scrollContainer, styles.confirmationContainer]}>
// // //         <Text style={styles.confirmationTitle}>Confirm Your Answer</Text>
// // //         <View style={styles.queryBox}>
// // //           <Text style={styles.queryText}>"{answer}"</Text>
// // //         </View>
// // //         <Text style={styles.confirmationPrompt}>Do you want to save this as your preference?</Text>

// // //         <View style={styles.buttonContainer}>
// // //           <Pressable style={[styles.confirmButton, styles.proceedButton]} onPress={confirmAnswer}>
// // //             <Text style={styles.buttonText}>Proceed</Text>
// // //           </Pressable>
// // //           <Pressable style={[styles.confirmButton, styles.cancelButton]} onPress={cancelAndReanswer}>
// // //             <Text style={styles.buttonText}>Re-answer</Text>
// // //           </Pressable>
// // //         </View>
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <ScrollView
// // //       contentContainerStyle={styles.scrollContainer}
// // //       accessible={true}
// // //       accessibilityLabel="Onboarding questionnaire"
// // //     >
// // //       <View style={styles.container}>
// // //         {/* Header */}
// // //         <View style={styles.header}>
// // //           <Text
// // //             style={styles.logo}
// // //             accessible={true}
// // //             accessibilityRole="header"
// // //             accessibilityLabel="VisionaryGuide Setup"
// // //           >
// // //             VisionaryGuide
// // //           </Text>
// // //           <Text
// // //             style={styles.subtitle}
// // //             accessible={true}
// // //             accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}
// // //           >
// // //             Let's personalize your experience
// // //           </Text>
// // //         </View>

// // //         {/* Progress Bar */}
// // //         <View
// // //           style={styles.progressContainer}
// // //           accessible={true}
// // //           accessibilityRole="progressbar"
// // //           accessibilityLabel={`Progress: ${Math.round(progress)}% complete`}
// // //           accessibilityValue={{ now: progress, min: 0, max: 100 }}
// // //         >
// // //           <View style={styles.progressBar}>
// // //             <View style={[styles.progressFill, { width: `${progress}%` }]} />
// // //           </View>
// // //           <Text style={styles.progressText}>
// // //             {idx + 1} / {questions.length}
// // //           </Text>
// // //         </View>

// // //         {/* Question Card */}
// // //         <View style={styles.questionCard}>
// // //           <Text
// // //             style={styles.questionLabel}
// // //             accessible={true}
// // //             accessibilityRole="text"
// // //           >
// // //             Question {idx + 1}
// // //           </Text>
// // //           <Text
// // //             style={styles.questionText}
// // //             accessible={true}
// // //             accessibilityRole="text"
// // //             accessibilityLabel={questions[idx].text}
// // //           >
// // //             {questions[idx].text}
// // //           </Text>
// // //         </View>

// // //         {/* Answer Input */}
// // //         <View style={styles.inputContainer}>
// // //           <Text
// // //             style={styles.inputLabel}
// // //             accessible={true}
// // //           >
// // //             Your Answer
// // //           </Text>
// // //           <TextInput
// // //             style={styles.input}
// // //             value={answer}
// // //             onChangeText={setAnswer}
// // //             placeholder="Type your answer here..."
// // //             placeholderTextColor="#999"
// // //             accessible={true}
// // //             accessibilityLabel="Answer input field"
// // //             accessibilityHint="Enter your answer or use voice input below"
// // //             multiline
// // //             numberOfLines={3}
// // //           />
// // //         </View>

// // //         {/* Voice Input Button */}
// // //         <Pressable
// // //           style={({ pressed }) => [
// // //             styles.micButton,
// // //             pressed && styles.micPressed,
// // //             isRecording && styles.micRecording
// // //           ]}
// // //           onLongPress={startRecording}
// // //           onPressOut={stopRecording}
// // //           disabled={isRecording}
// // //           accessible={true}
// // //           accessibilityRole="button"
// // //           accessibilityLabel={isRecording ? 'Recording in progress' : 'Hold to record voice answer'}
// // //           accessibilityHint="Press and hold to speak your answer, release when done"
// // //           accessibilityState={{ disabled: isRecording }}
// // //         >
// // //           <View style={styles.micButtonContent}>
// // //             <View style={styles.micIcon}>
// // //               <Text style={styles.micIconText}>🎤</Text>
// // //             </View>
// // //             <Text style={styles.micText}>
// // //               {isRecording ? 'Recording...' : 'Hold to Speak'}
// // //             </Text>
// // //           </View>
// // //         </Pressable>

// // //         {/* Navigation Buttons */}
// // //         <View style={styles.buttonRow}>
// // //           <Pressable
// // //             style={({ pressed }) => [
// // //               styles.nextButton,
// // //               pressed && styles.nextPressed
// // //             ]}
// // //             onPress={saveAndNext}
// // //             accessible={true}
// // //             accessibilityRole="button"
// // //             accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
// // //             accessibilityHint="Saves your answer and continues"
// // //           >
// // //             <Text style={styles.nextText}>
// // //               {idx < questions.length - 1 ? 'Next' : 'Complete'}
// // //             </Text>
// // //           </Pressable>
// // //         </View>

// // //         {/* Helper Text */}
// // //         <Text
// // //           style={styles.helperText}
// // //           accessible={true}
// // //           accessibilityRole="text"
// // //         >
// // //           💡 Tip: Hold the microphone button and speak naturally
// // //         </Text>
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   // Existing Styles (Unchanged)
// // //   scrollContainer: {
// // //     flexGrow: 1,
// // //     backgroundColor: '#F8F9FA',
// // //   },
// // //   container: {
// // //     flex: 1,
// // //     padding: 24,
// // //     paddingTop: 60,
// // //   },
// // //   header: {
// // //     marginBottom: 32,
// // //     alignItems: 'center',
// // //   },
// // //   logo: {
// // //     fontSize: 32,
// // //     fontWeight: '800',
// // //     color: '#1A1A1A',
// // //     marginBottom: 8,
// // //     letterSpacing: 0.5,
// // //   },
// // //   subtitle: {
// // //     fontSize: 16,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //   },
// // //   progressContainer: {
// // //     marginBottom: 32,
// // //   },
// // //   progressBar: {
// // //     height: 8,
// // //     backgroundColor: '#E0E0E0',
// // //     borderRadius: 4,
// // //     overflow: 'hidden',
// // //     marginBottom: 8,
// // //   },
// // //   progressFill: {
// // //     height: '100%',
// // //     backgroundColor: '#007AFF',
// // //     borderRadius: 4,
// // //   },
// // //   progressText: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     textAlign: 'right',
// // //     fontWeight: '600',
// // //   },
// // //   questionCard: {
// // //     backgroundColor: '#FFFFFF',
// // //     borderRadius: 16,
// // //     padding: 24,
// // //     marginBottom: 24,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.08,
// // //     shadowRadius: 8,
// // //     elevation: 3,
// // //   },
// // //   questionLabel: {
// // //     fontSize: 14,
// // //     color: '#007AFF',
// // //     fontWeight: '700',
// // //     marginBottom: 12,
// // //     letterSpacing: 0.5,
// // //     textTransform: 'uppercase',
// // //   },
// // //   questionText: {
// // //     fontSize: 20,
// // //     color: '#1A1A1A',
// // //     lineHeight: 28,
// // //     fontWeight: '600',
// // //   },
// // //   inputContainer: {
// // //     marginBottom: 24,
// // //   },
// // //   inputLabel: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     fontWeight: '600',
// // //     marginBottom: 8,
// // //   },
// // //   input: {
// // //     backgroundColor: '#FFFFFF',
// // //     borderWidth: 2,
// // //     borderColor: '#E0E0E0',
// // //     padding: 16,
// // //     borderRadius: 12,
// // //     fontSize: 16,
// // //     minHeight: 80,
// // //     textAlignVertical: 'top',
// // //     color: '#1A1A1A',
// // //   },
// // //   micButton: {
// // //     backgroundColor: '#FF9500',
// // //     borderRadius: 16,
// // //     marginBottom: 16,
// // //     shadowColor: '#FF9500',
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 8,
// // //     elevation: 6,
// // //   },
// // //   micPressed: {
// // //     backgroundColor: '#CC7700',
// // //     transform: [{ scale: 0.97 }],
// // //   },
// // //   micRecording: {
// // //     backgroundColor: '#FF3B30',
// // //     shadowColor: '#FF3B30',
// // //   },
// // //   micButtonContent: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     padding: 18,
// // //   },
// // //   micIcon: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: 'rgba(255,255,255,0.2)',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     marginRight: 12,
// // //   },
// // //   micIconText: {
// // //     fontSize: 20,
// // //   },
// // //   micText: {
// // //     color: '#FFFFFF',
// // //     fontWeight: '700',
// // //     fontSize: 18,
// // //   },
// // //   buttonRow: {
// // //     flexDirection: 'row',
// // //     marginBottom: 16,
// // //   },
// // //   nextButton: {
// // //     flex: 1,
// // //     backgroundColor: '#34C759',
// // //     padding: 18,
// // //     borderRadius: 16,
// // //     alignItems: 'center',
// // //     shadowColor: '#34C759',
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 8,
// // //     elevation: 6,
// // //   },
// // //   nextPressed: {
// // //     backgroundColor: '#2a9d4f',
// // //     transform: [{ scale: 0.97 }],
// // //   },
// // //   nextText: {
// // //     color: '#FFFFFF',
// // //     fontWeight: '700',
// // //     fontSize: 18,
// // //   },
// // //   helperText: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //     fontStyle: 'italic',
// // //   },
// // //   // ----------------------------------------------------
// // //   // 👇 NEW STYLES FOR CONFIRMATION SCREEN
// // //   // ----------------------------------------------------
// // //   confirmationContainer: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     padding: 40,
// // //     backgroundColor: '#1C1C1E', // Dark background for contrast
// // //   },
// // //   confirmationTitle: {
// // //     fontSize: 26,
// // //     fontWeight: '900',
// // //     color: 'white',
// // //     marginBottom: 30,
// // //     textAlign: 'center',
// // //   },
// // //   queryBox: {
// // //     backgroundColor: 'rgba(255, 255, 255, 0.1)',
// // //     padding: 25,
// // //     borderRadius: 15,
// // //     width: '100%',
// // //     alignItems: 'center',
// // //     marginBottom: 30,
// // //   },
// // //   queryText: {
// // //     fontSize: 22,
// // //     color: '#007AFF', // Blue color for the transcribed text
// // //     fontWeight: '600',
// // //     textAlign: 'center',
// // //     fontStyle: 'italic',
// // //   },
// // //   confirmationPrompt: {
// // //     fontSize: 18,
// // //     color: '#A0A0A0',
// // //     marginBottom: 50,
// // //     fontWeight: '500',
// // //     textAlign: 'center',
// // //   },
// // //   buttonContainer: {
// // //     flexDirection: 'row',
// // //     width: '100%',
// // //     justifyContent: 'space-between',
// // //   },
// // //   confirmButton: {
// // //     paddingVertical: 15,
// // //     paddingHorizontal: 20,
// // //     borderRadius: 12,
// // //     width: '48%',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   proceedButton: {
// // //     backgroundColor: '#34C759', // Green
// // //   },
// // //   cancelButton: {
// // //     backgroundColor: '#FF3B30', // Red
// // //   },
// // //   buttonText: {
// // //     color: 'white',
// // //     fontSize: 18,
// // //     fontWeight: '700',
// // //   },
// // // });
// // import React, { useState, useEffect } from 'react';
// // // Import Pressable from 'react-native', not the one from your Pressable alias
// // import { View, Text, TextInput, StyleSheet, Alert, Pressable as RNPressable, ScrollView, AccessibilityInfo } from 'react-native';
// // import * as Speech from 'expo-speech';
// // import * as Haptics from 'expo-haptics';
// // import { Audio } from 'expo-av';
// // import axios from 'axios';

// // // NOTE: Using RNPressable below to avoid naming conflict with the Pressable alias from the import.

// // const questions = [
// //   {
// //     key: 'crowdTolerance',
// //     text: 'How sensitive are you to crowded spaces? Choose: High (prefer quiet), Medium, or Low (crowds are fine).'
// //   },
// //   {
// //     key: 'seatingPreference',
// //     text: 'When you board a bus, which area do you prefer: front, middle, or rear?'
// //   },
// //   {
// //     key: 'conditionTriggers',
// //     text: 'Are you concerned about bus condition? Example, broken seats, visible trash, or loud engine noise.'
// //   },
// //   {
// //     key: 'detailLevel',
// //     text: 'How detailed should my descriptions be? Choose: Short (just the fact), or Detailed (include safety and context).'
// //   },
// // ];

// // const IP = 'IP';
// // const GOOGLE_API_KEY = 'API-KEY';

// // export default function OnboardingScreen({ navigation, route }) {
// //   const userId = route.params?.userId ?? 'test-user';
// //   const [idx, setIdx] = useState(0);
// //   const [answer, setAnswer] = useState('');
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [recording, setRecording] = useState(null);
// //   const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);

// //   useEffect(() => {
// //     if (!isAwaitingConfirmation) {
// //       Speech.speak(questions[idx].text, { rate: 0.9 });
// //       AccessibilityInfo.announceForAccessibility(
// //         `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
// //       );
// //     }
// //   }, [idx, isAwaitingConfirmation]);

// //   const startRecording = async () => {
// //     if (isAwaitingConfirmation) return;

// //     try {
// //       const { status } = await Audio.requestPermissionsAsync();
// //       if (status !== 'granted') {
// //         Alert.alert('Microphone Access', 'Please allow microphone access in Settings to use voice input.');
// //         return;
// //       }

// //       await Audio.setAudioModeAsync({
// //         allowsRecordingIOS: true,
// //         playsInSilentModeIOS: true,
// //       });

// //       const { recording } = await Audio.Recording.createAsync(
// //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// //       );
// //       setRecording(recording);
// //       setIsRecording(true);
// //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// //       AccessibilityInfo.announceForAccessibility('Recording started');
// //     } catch (err) {
// //       Alert.alert('Error', 'Recording failed. Please try again.');
// //     }
// //   };

// //   const stopRecording = async () => {
// //     if (!recording) return;
// //     setIsRecording(false);
// //     await recording.stopAndUnloadAsync();
// //     const uri = recording.getURI();

// //     try {
// //       const response = await fetch(uri);
// //       const blob = await response.blob();
// //       const reader = new FileReader();
// //       reader.onloadend = async () => {
// //         const base64 = reader.result.split(',')[1];
// //         const res = await fetch(
// //           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
// //           {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({
// //               config: {
// //                 encoding: 'WEBM_OPUS',
// //                 sampleRateHertz: 48000,
// //                 languageCode: 'en-US',
// //               },
// //               audio: { content: base64 },
// //             }),
// //           }
// //         );
// //         const data = await res.json();
// //         const text = (data.results?.[0]?.alternatives?.[0]?.transcript || 'Nothing heard').trim();

// //         setAnswer(text);
// //         setIsAwaitingConfirmation(true);
// //         Speech.speak(`I heard, "${text}". Do you want to save this answer?`);

// //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
// //         AccessibilityInfo.announceForAccessibility(`Recognized: ${text}. Awaiting confirmation.`);
// //       };
// //       reader.readAsDataURL(blob);
// //     } catch (e) {
// //       Alert.alert('Speech Recognition Error', 'Using fallback response');
// //       const mockResponses = ['low', 'rear', 'loud noises', 'Detailed'];
// //       const mockAnswer = mockResponses[idx] || 'Medium';

// //       setAnswer(mockAnswer);
// //       setIsAwaitingConfirmation(true);
// //       Speech.speak(`I suggest the answer, "${mockAnswer}". Do you want to save this answer?`);
// //     }
// //     setRecording(null);
// //   };

// //   const confirmAnswer = () => {
// //     setIsAwaitingConfirmation(false);
// //     saveAndNext();
// //   };

// //   const cancelAndReanswer = () => {
// //     setIsAwaitingConfirmation(false);
// //     setAnswer('');
// //     Speech.speak(`Please re-answer the question: ${questions[idx].text}`);
// //     AccessibilityInfo.announceForAccessibility("Answer cancelled. Please record again.");
// //   };

// //   const saveAndNext = async () => {
// //     if (isRecording) {
// //       setIsRecording(false);
// //     }

// //     const q = questions[idx];

// //     if (!answer.trim()) {
// //       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
// //       return;
// //     }

// //     try {
// //       await axios.post(`http://${IP}:8000/store-preference`, {
// //         userId,
// //         key: q.key,
// //         value: (answer || 'skipped').toLowerCase().trim(),
// //       }, {
// //         headers: { 'Content-Type': 'application/json' }
// //       });

// //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// //     } catch (e) {
// //       Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
// //       return;
// //     }

// //     if (idx < questions.length - 1) {
// //       setIdx(idx + 1);
// //       setAnswer('');
// //       setIsAwaitingConfirmation(false);
// //     } else {
// //       Speech.speak('Welcome to VisionaryGuide! Setup complete.');
// //       navigation.replace('Landing', { userId });
// //     }
// //   };

// //   const progress = ((idx + 1) / questions.length) * 100;

// //   // ----------------------------------------------------
// //   // CONFIRMATION SCREEN RENDER
// //   // ----------------------------------------------------
// //   if (isAwaitingConfirmation) {
// //     return (
// //       <View style={[styles.scrollContainer, styles.confirmationContainer]}>
// //         <Text style={styles.confirmationTitle}>Confirm Your Answer</Text>
// //         <View style={styles.queryBox}>
// //           <Text style={styles.queryText}>"{answer}"</Text>
// //         </View>
// //         <Text style={styles.confirmationPrompt}>Do you want to save this as your preference?</Text>

// //         <View style={styles.buttonContainer}>
// //           <RNPressable style={[styles.confirmButton, styles.proceedButton]} onPress={confirmAnswer}>
// //             <Text style={styles.buttonText}>Proceed</Text>
// //           </RNPressable>
// //           <RNPressable style={[styles.confirmButton, styles.cancelButton]} onPress={cancelAndReanswer}>
// //             <Text style={styles.buttonText}>Re-answer</Text>
// //           </RNPressable>
// //         </View>
// //       </View>
// //     );
// //   }

// //   return (
// //     // 🚨 FIX: Use RNPressable as the full-screen container for reliable long-press 🚨
// //     <RNPressable
// //       style={{ flex: 1 }}
// //       accessible={true}
// //       accessibilityLabel="Onboarding questionnaire"
// //       onLongPress={startRecording}
// //       onPressOut={stopRecording}
// //       // Disable touch events during recording to prevent accidental input
// //       pointerEvents={isRecording ? 'none' : 'auto'}
// //     >
// //       <ScrollView
// //         contentContainerStyle={styles.scrollContainer}
// //         // Add a small delay for touch start if the long press is competing with scroll on some devices
// //         scrollEventThrottle={16}
// //       >
// //         <View style={styles.container}>
// //           {/* Header */}
// //           <View style={styles.header}>
// //             <Text
// //               style={styles.logo}
// //               accessible={true}
// //               accessibilityRole="header"
// //               accessibilityLabel="VisionaryGuide Setup"
// //             >
// //               VisionaryGuide
// //             </Text>
// //             <Text
// //               style={styles.subtitle}
// //               accessible={true}
// //               accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}
// //             >
// //               Let's personalize your experience
// //             </Text>
// //           </View>

// //           {/* Progress Bar */}
// //           <View
// //             style={styles.progressContainer}
// //             accessible={true}
// //             accessibilityRole="progressbar"
// //             accessibilityLabel={`Progress: ${Math.round(progress)}% complete`}
// //             accessibilityValue={{ now: progress, min: 0, max: 100 }}
// //           >
// //             <View style={styles.progressBar}>
// //               <View style={[styles.progressFill, { width: `${progress}%` }]} />
// //             </View>
// //             <Text style={styles.progressText}>
// //               {idx + 1} / {questions.length}
// //             </Text>
// //           </View>

// //           {/* Question Card */}
// //           <View style={styles.questionCard}>
// //             <Text
// //               style={styles.questionLabel}
// //               accessible={true}
// //               accessibilityRole="text"
// //             >
// //               Question {idx + 1}
// //             </Text>
// //             <Text
// //               style={styles.questionText}
// //               accessible={true}
// //               accessibilityRole="text"
// //               accessibilityLabel={questions[idx].text}
// //             >
// //               {questions[idx].text}
// //             </Text>
// //           </View>

// //           {/* Answer Input */}
// //           <View style={styles.inputContainer}>
// //             <Text
// //               style={styles.inputLabel}
// //               accessible={true}
// //             >
// //               Your Answer
// //             </Text>
// //             <TextInput
// //               style={styles.input}
// //               value={answer}
// //               onChangeText={setAnswer}
// //               placeholder="Type your answer here..."
// //               placeholderTextColor="#999"
// //               accessible={true}
// //               accessibilityLabel="Answer input field"
// //               accessibilityHint="Enter your answer or use voice input below"
// //               multiline
// //               numberOfLines={3}
// //               editable={!isRecording}
// //             />
// //           </View>

// //           {/* Voice Input Indicator */}
// //           <View
// //             style={[
// //               styles.micButton,
// //               isRecording && styles.micRecording
// //             ]}
// //             accessible={true}
// //             accessibilityRole="text"
// //             accessibilityLabel={isRecording ? 'Recording in progress' : 'Press and hold anywhere on screen to record'}
// //           >
// //             <View style={styles.micButtonContent}>
// //               <View style={styles.micIcon}>
// //                 <Text style={styles.micIconText}>🎤</Text>
// //               </View>
// //               <Text style={styles.micText}>
// //                 {isRecording ? 'Recording...' : 'Hold Anywhere to Speak'}
// //               </Text>
// //             </View>
// //           </View>

// //           {/* Navigation Buttons */}
// //           <View style={styles.buttonRow}>
// //             <RNPressable
// //               style={({ pressed }) => [
// //                 styles.nextButton,
// //                 pressed && styles.nextPressed
// //               ]}
// //               onPress={saveAndNext}
// //               disabled={isRecording}
// //               accessible={true}
// //               accessibilityRole="button"
// //               accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
// //               accessibilityHint="Saves your answer and continues"
// //             >
// //               <Text style={styles.nextText}>
// //                 {idx < questions.length - 1 ? 'Next' : 'Complete'}
// //               </Text>
// //             </RNPressable>
// //           </View>

// //           {/* Helper Text */}
// //           <Text
// //             style={styles.helperText}
// //             accessible={true}
// //             accessibilityRole="text"
// //           >
// //             💡 Tip: Hold **anywhere** on the screen to speak your answer
// //           </Text>
// //         </View>
// //       </ScrollView>
// //     </RNPressable>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   // ... (All styles remain completely unchanged) ...
// //   scrollContainer: {
// //     flexGrow: 1,
// //     backgroundColor: '#F8F9FA',
// //   },
// //   container: {
// //     flex: 1,
// //     padding: 24,
// //     paddingTop: 60,
// //   },
// //   header: {
// //     marginBottom: 32,
// //     alignItems: 'center',
// //   },
// //   logo: {
// //     fontSize: 32,
// //     fontWeight: '800',
// //     color: '#1A1A1A',
// //     marginBottom: 8,
// //     letterSpacing: 0.5,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //   },
// //   progressContainer: {
// //     marginBottom: 32,
// //   },
// //   progressBar: {
// //     height: 8,
// //     backgroundColor: '#E0E0E0',
// //     borderRadius: 4,
// //     overflow: 'hidden',
// //     marginBottom: 8,
// //   },
// //   progressFill: {
// //     height: '100%',
// //     backgroundColor: '#007AFF',
// //     borderRadius: 4,
// //   },
// //   progressText: {
// //     fontSize: 14,
// //     color: '#666',
// //     textAlign: 'right',
// //     fontWeight: '600',
// //   },
// //   questionCard: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 16,
// //     padding: 24,
// //     marginBottom: 24,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.08,
// //     shadowRadius: 8,
// //     elevation: 3,
// //   },
// //   questionLabel: {
// //     fontSize: 14,
// //     color: '#007AFF',
// //     fontWeight: '700',
// //     marginBottom: 12,
// //     letterSpacing: 0.5,
// //     textTransform: 'uppercase',
// //   },
// //   questionText: {
// //     fontSize: 20,
// //     color: '#1A1A1A',
// //     lineHeight: 28,
// //     fontWeight: '600',
// //   },
// //   inputContainer: {
// //     marginBottom: 24,
// //   },
// //   inputLabel: {
// //     fontSize: 14,
// //     color: '#666',
// //     fontWeight: '600',
// //     marginBottom: 8,
// //   },
// //   input: {
// //     backgroundColor: '#FFFFFF',
// //     borderWidth: 2,
// //     borderColor: '#E0E0E0',
// //     padding: 16,
// //     borderRadius: 12,
// //     fontSize: 16,
// //     minHeight: 80,
// //     textAlignVertical: 'top',
// //     color: '#1A1A1A',
// //   },
// //   micButton: {
// //     backgroundColor: '#FF9500',
// //     borderRadius: 16,
// //     marginBottom: 16,
// //     shadowColor: '#FF9500',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 6,
// //   },
// //   micPressed: {
// //     backgroundColor: '#CC7700',
// //     transform: [{ scale: 0.97 }],
// //   },
// //   micRecording: {
// //     backgroundColor: '#FF3B30',
// //     shadowColor: '#FF3B30',
// //   },
// //   micButtonContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     padding: 18,
// //   },
// //   micIcon: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     backgroundColor: 'rgba(255,255,255,0.2)',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginRight: 12,
// //   },
// //   micIconText: {
// //     fontSize: 20,
// //   },
// //   micText: {
// //     color: '#FFFFFF',
// //     fontWeight: '700',
// //     fontSize: 18,
// //   },
// //   buttonRow: {
// //     flexDirection: 'row',
// //     marginBottom: 16,
// //   },
// //   nextButton: {
// //     flex: 1,
// //     backgroundColor: '#34C759',
// //     padding: 18,
// //     borderRadius: 16,
// //     alignItems: 'center',
// //     shadowColor: '#34C759',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 6,
// //   },
// //   nextPressed: {
// //     backgroundColor: '#2a9d4f',
// //     transform: [{ scale: 0.97 }],
// //   },
// //   nextText: {
// //     color: '#FFFFFF',
// //     fontWeight: '700',
// //     fontSize: 18,
// //   },
// //   helperText: {
// //     fontSize: 14,
// //     color: '#666',
// //     textAlign: 'center',
// //     fontStyle: 'italic',
// //   },
// //   confirmationContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 40,
// //     backgroundColor: '#1C1C1E',
// //   },
// //   confirmationTitle: {
// //     fontSize: 26,
// //     fontWeight: '900',
// //     color: 'white',
// //     marginBottom: 30,
// //     textAlign: 'center',
// //   },
// //   queryBox: {
// //     backgroundColor: 'rgba(255, 255, 255, 0.1)',
// //     padding: 25,
// //     borderRadius: 15,
// //     width: '100%',
// //     alignItems: 'center',
// //     marginBottom: 30,
// //   },
// //   queryText: {
// //     fontSize: 22,
// //     color: '#007AFF',
// //     fontWeight: '600',
// //     textAlign: 'center',
// //     fontStyle: 'italic',
// //   },
// //   confirmationPrompt: {
// //     fontSize: 18,
// //     color: '#A0A0A0',
// //     marginBottom: 50,
// //     fontWeight: '500',
// //     textAlign: 'center',
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     width: '100%',
// //     justifyContent: 'space-between',
// //   },
// //   confirmButton: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 20,
// //     borderRadius: 12,
// //     width: '48%',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   proceedButton: {
// //     backgroundColor: '#34C759',
// //   },
// //   cancelButton: {
// //     backgroundColor: '#FF3B30',
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 18,
// //     fontWeight: '700',
// //   },
// // });

// import React, { useState, useEffect } from 'react';
// // Import Pressable from 'react-native', not the one from your Pressable alias
// import { View, Text, TextInput, StyleSheet, Alert, Pressable as RNPressable, ScrollView, AccessibilityInfo } from 'react-native';
// import * as Speech from 'expo-speech';
// import * as Haptics from 'expo-haptics';
// import { Audio } from 'expo-av';
// import axios from 'axios';

// const questions = [
//   {
//     key: 'crowdTolerance',
//     text: 'How sensitive are you to crowded spaces? Choose: High (prefer quiet), Medium, or Low (crowds are fine).'
//   },
//   {
//     key: 'seatingPreference',
//     text: 'When you board a bus, which area do you prefer: front, middle, or rear?'
//   },
//   {
//     key: 'conditionTriggers',
//     text: 'Are you concerned about bus condition? Example, broken seats, visible trash, or loud engine noise.'
//   },
//   {
//     key: 'detailLevel',
//     text: 'How detailed should my descriptions be? Choose: Short (just the fact), or Detailed (include safety and context).'
//   },
// ];

// const IP = 'IP';
// const GOOGLE_API_KEY = 'API-KEY';

// export default function OnboardingScreen({ navigation, route }) {
//   const userId = route.params?.userId ?? 'test-user';
//   const [idx, setIdx] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [shouldSpeakNext, setShouldSpeakNext] = useState(true);

//   // --- Core Speech Logic ---
//   useEffect(() => {
//     // 🚨 FIX: Ensure we only speak the question if not confirming AND permission is granted
//     if (!isAwaitingConfirmation && shouldSpeakNext) {
//       // Stop any previous speech just in case
//       Speech.stop();
//       setIsSpeaking(true);
//       Speech.speak(questions[idx].text, {
//         rate: 0.9,
//         // Reset isSpeaking state once done
//         onDone: () => setIsSpeaking(false)
//       });
//       AccessibilityInfo.announceForAccessibility(
//         `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
//       );
//       // Reset the flag for the next index change
//       setShouldSpeakNext(true);
//     }
//   }, [idx, isAwaitingConfirmation, shouldSpeakNext]);

//   // --- Recording Handlers ---
//   const startRecording = async () => {
//     // 🚨 FIX 1: Stop speech immediately on long press interaction
//     if (isSpeaking) {
//       Speech.stop();
//       setIsSpeaking(false);
//     }
//     if (isAwaitingConfirmation) return;

//     try {
//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Microphone Access', 'Please allow microphone access in Settings to use voice input.');
//         return;
//       }

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(recording);
//       setIsRecording(true);
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//       AccessibilityInfo.announceForAccessibility('Recording started');
//     } catch (err) {
//       Alert.alert('Error', 'Recording failed. Please try again.');
//     }
//   };

//   const stopRecording = async () => {
//     if (!recording) return;
//     setIsRecording(false);
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();

//     try {
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64 = reader.result.split(',')[1];
//         const res = await fetch(
//           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               config: {
//                 encoding: 'WEBM_OPUS',
//                 sampleRateHertz: 48000,
//                 languageCode: 'en-US',
//               },
//               audio: { content: base64 },
//             }),
//           }
//         );
//         const data = await res.json();
//         const text = (data.results?.[0]?.alternatives?.[0]?.transcript || 'Nothing heard').trim();

//         // 🚨 NEW FEATURE: If on confirmation screen, check for voice commands
//         if (isAwaitingConfirmation) {
//           const command = text.toLowerCase();
//           if (command.includes('proceed') || command.includes('confirm') || command.includes('save')) {
//             confirmAnswer();
//             return;
//           }
//           if (command.includes('re-answer') || command.includes('cancel') || command.includes('no')) {
//             cancelAndReanswer();
//             return;
//           }
//         }

//         // Standard flow: Process the answer
//         Speech.stop();
//         setIsSpeaking(true);
//         setAnswer(text);
//         setIsAwaitingConfirmation(true);
//         Speech.speak(`I heard, "${text}". Do you want to save this answer?`, {
//           onDone: () => setIsSpeaking(false) // Reset after confirmation speech
//         });

//         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         AccessibilityInfo.announceForAccessibility(`Recognized: ${text}. Awaiting confirmation.`);
//       };
//       reader.readAsDataURL(blob);
//     } catch (e) {
//       Alert.alert('Speech Recognition Error', 'Using fallback response');
//       const mockResponses = ['low', 'rear', 'loud noises', 'Detailed'];
//       const mockAnswer = mockResponses[idx] || 'Medium';

//       Speech.stop();
//       setIsSpeaking(true); // Set speaking state before speaking the fallback
//       setAnswer(mockAnswer);
//       setIsAwaitingConfirmation(true);
//       Speech.speak(`I suggest the answer, "${mockAnswer}". Do you want to save this answer?`, {
//         onDone: () => setIsSpeaking(false) // Reset after fallback speech
//       });
//     }
//     setRecording(null);
//   };

//   // --- Confirmation Handlers ---
//   const confirmAnswer = () => {
//     // 🚨 FIX 3: Ensure speech is stopped before proceeding to next question
//     Speech.stop();
//     setIsSpeaking(false);
//     setIsAwaitingConfirmation(false);
//     setShouldSpeakNext(true);
//     saveAndNext();
//   };

//   const cancelAndReanswer = () => {
//     // 🚨 FIX 1: Stop speech immediately on re-answer interaction
//     Speech.stop();
//     setIsSpeaking(false);

//     setAnswer('');
//     setIsAwaitingConfirmation(false);

//     // Announce the re-answer instruction and question
//     const speechText = `Please re-answer the question: ${questions[idx].text}`;
//     setIsSpeaking(true);
//     Speech.speak(speechText, {
//       onDone: () => setIsSpeaking(false) // Reset speaking state when done
//     });
//     AccessibilityInfo.announceForAccessibility("Answer cancelled. Please record again.");
//     setShouldSpeakNext(false);
//   };

//   // --- Navigation/Save Logic ---
//   const saveAndNext = async () => {
//     if (isRecording) {
//       setIsRecording(false);
//     }

//     const q = questions[idx];

//     if (!answer.trim()) {
//       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
//       return;
//     }

//     try {
//       await axios.post(`http://${IP}:8000/store-preference`, {
//         userId,
//         key: q.key,
//         value: (answer || 'skipped').toLowerCase().trim(),
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     } catch (e) {
//       Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
//       return;
//     }

//     if (idx < questions.length - 1) {
//       setIdx(idx + 1);
//       setAnswer('');
//       setIsAwaitingConfirmation(false);
//       // The useEffect will handle the speaking of the new question
//     } else {
//       setIsSpeaking(true); // Set speaking state before final announcement
//       Speech.speak('Welcome to VisionaryGuide! Setup complete.', {
//         onDone: () => setIsSpeaking(false)
//       });
//       navigation.replace('Landing', { userId });
//     }
//   };

//   const progress = ((idx + 1) / questions.length) * 100;

//   // ----------------------------------------------------
//   // CONFIRMATION SCREEN RENDER
//   // ----------------------------------------------------
//   if (isAwaitingConfirmation) {
//     return (
//       // 🚨 Confirmation Screen also uses global long press for voice commands
//       <RNPressable
//         style={{ flex: 1 }}
//         accessible={true}
//         accessibilityLabel="Confirmation screen. Hold anywhere to use voice commands."
//         onLongPress={startRecording}
//         onPressOut={stopRecording}
//         pointerEvents={isRecording || isSpeaking ? 'none' : 'auto'}
//       >
//         <View style={[styles.scrollContainer, styles.confirmationContainer]}>
//           <Text style={styles.confirmationTitle}>Confirm Your Answer</Text>
//           <View style={styles.queryBox}>
//             <Text style={styles.queryText}>"{answer}"</Text>
//           </View>
//           <Text style={styles.confirmationPrompt}>Do you want to save this as your preference? (Say "proceed" or "re-answer")</Text>

//           <View style={styles.buttonContainer}>
//             <RNPressable style={[styles.confirmButton, styles.proceedButton]} onPress={confirmAnswer}>
//               <Text style={styles.buttonText}>Proceed</Text>
//             </RNPressable>
//             <RNPressable style={[styles.confirmButton, styles.cancelButton]} onPress={cancelAndReanswer}>
//               <Text style={styles.buttonText}>Re-answer</Text>
//             </RNPressable>
//           </View>
//         </View>
//       </RNPressable>
//     );
//   }

//   return (
//     <RNPressable
//       style={{ flex: 1 }}
//       accessible={true}
//       accessibilityLabel="Onboarding questionnaire"
//       onLongPress={startRecording}
//       onPressOut={stopRecording}
//       // Disable touch events when recording OR speaking is active
//       pointerEvents={isRecording || isSpeaking ? 'none' : 'auto'}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         scrollEventThrottle={16}
//       >
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text
//               style={styles.logo}
//               accessible={true}
//               accessibilityRole="header"
//               accessibilityLabel="VisionaryGuide Setup"
//             >
//               VisionaryGuide
//             </Text>
//             <Text
//               style={styles.subtitle}
//               accessible={true}
//               accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}
//             >
//               Let's personalize your experience
//             </Text>
//           </View>

//           {/* Progress Bar */}
//           <View
//             style={styles.progressContainer}
//             accessible={true}
//             accessibilityRole="progressbar"
//             accessibilityLabel={`Progress: ${Math.round(progress)}% complete`}
//             accessibilityValue={{ now: progress, min: 0, max: 100 }}
//           >
//             <View style={styles.progressBar}>
//               <View style={[styles.progressFill, { width: `${progress}%` }]} />
//             </View>
//             <Text style={styles.progressText}>
//               {idx + 1} / {questions.length}
//             </Text>
//           </View>

//           {/* Question Card */}
//           <View style={styles.questionCard}>
//             <Text
//               style={styles.questionLabel}
//               accessible={true}
//               accessibilityRole="text"
//             >
//               Question {idx + 1}
//             </Text>
//             <Text
//               style={styles.questionText}
//               accessible={true}
//               accessibilityRole="text"
//               accessibilityLabel={questions[idx].text}
//             >
//               {questions[idx].text}
//             </Text>
//           </View>

//           {/* Answer Input */}
//           <View style={styles.inputContainer}>
//             <Text
//               style={styles.inputLabel}
//               accessible={true}
//             >
//               Your Answer
//             </Text>
//             <TextInput
//               style={styles.input}
//               value={answer}
//               onChangeText={setAnswer}
//               placeholder="Type your answer here..."
//               placeholderTextColor="#999"
//               accessible={true}
//               accessibilityLabel="Answer input field"
//               accessibilityHint="Enter your answer or use voice input below"
//               multiline
//               numberOfLines={3}
//               // Disable manual input when recording or speaking
//               editable={!isRecording && !isSpeaking}
//             />
//           </View>

//           {/* Voice Input Indicator */}
//           <View
//             style={[
//               styles.micButton,
//               isRecording && styles.micRecording,
//               // Visually indicate when the button is locked due to speaking
//               isSpeaking && { opacity: 0.5, backgroundColor: '#666' }
//             ]}
//             accessible={true}
//             accessibilityRole="text"
//             accessibilityLabel={isRecording ? 'Recording in progress' : isSpeaking ? 'System is speaking, recording is paused' : 'Press and hold anywhere on screen to record'}
//           >
//             <View style={styles.micButtonContent}>
//               <View style={styles.micIcon}>
//                 <Text style={styles.micIconText}>🎤</Text>
//               </View>
//               <Text style={styles.micText}>
//                 {isRecording ? 'Recording...' : isSpeaking ? 'System Speaking...' : 'Hold Anywhere to Speak'}
//               </Text>
//             </View>
//           </View>

//           {/* Navigation Buttons */}
//           <View style={styles.buttonRow}>
//             <RNPressable
//               style={({ pressed }) => [
//                 styles.nextButton,
//                 pressed && styles.nextPressed
//               ]}
//               onPress={saveAndNext}
//               disabled={isRecording || isSpeaking}
//               accessible={true}
//               accessibilityRole="button"
//               accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
//               accessibilityHint="Saves your answer and continues"
//             >
//               <Text style={styles.nextText}>
//                 {idx < questions.length - 1 ? 'Next' : 'Complete'}
//               </Text>
//             </RNPressable>
//           </View>

//           {/* Helper Text */}
//           <Text
//             style={styles.helperText}
//             accessible={true}
//             accessibilityRole="text"
//           >
//             💡 Tip: Hold **anywhere** on the screen to speak your answer
//           </Text>
//         </View>
//       </ScrollView>
//     </RNPressable>
//   );
// }

// const styles = StyleSheet.create({
//   // ... (All styles are included below for completeness) ...
//   scrollContainer: {
//     flexGrow: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   container: {
//     flex: 1,
//     padding: 24,
//     paddingTop: 60,
//   },
//   header: {
//     marginBottom: 32,
//     alignItems: 'center',
//   },
//   logo: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#1A1A1A',
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   progressContainer: {
//     marginBottom: 32,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginBottom: 8,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#007AFF',
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'right',
//     fontWeight: '600',
//   },
//   questionCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   questionLabel: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '700',
//     marginBottom: 12,
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//   },
//   questionText: {
//     fontSize: 20,
//     color: '#1A1A1A',
//     lineHeight: 28,
//     fontWeight: '600',
//   },
//   inputContainer: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//     padding: 16,
//     borderRadius: 12,
//     fontSize: 16,
//     minHeight: 80,
//     textAlignVertical: 'top',
//     color: '#1A1A1A',
//   },
//   micButton: {
//     backgroundColor: '#FF9500',
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: '#FF9500',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   micPressed: {
//     backgroundColor: '#CC7700',
//     transform: [{ scale: 0.97 }],
//   },
//   micRecording: {
//     backgroundColor: '#FF3B30',
//     shadowColor: '#FF3B30',
//   },
//   micButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 18,
//   },
//   micIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   micIconText: {
//     fontSize: 20,
//   },
//   micText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//     fontSize: 18,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   nextButton: {
//     flex: 1,
//     backgroundColor: '#34C759',
//     padding: 18,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#34C759',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   nextPressed: {
//     backgroundColor: '#2a9d4f',
//     transform: [{ scale: 0.97 }],
//   },
//   nextText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//     fontSize: 18,
//   },
//   helperText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   confirmationContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     backgroundColor: '#1C1C1E',
//   },
//   confirmationTitle: {
//     fontSize: 26,
//     fontWeight: '900',
//     color: 'white',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   queryBox: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 25,
//     borderRadius: 15,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   queryText: {
//     fontSize: 22,
//     color: '#007AFF',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   confirmationPrompt: {
//     fontSize: 18,
//     color: '#A0A0A0',
//     marginBottom: 50,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   confirmButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     width: '48%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   proceedButton: {
//     backgroundColor: '#34C759',
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });
// import React, { useState, useEffect } from 'react';
// // Import Pressable from 'react-native', not the one from your Pressable alias
// import { View, Text, TextInput, StyleSheet, Alert, Pressable as RNPressable, ScrollView, AccessibilityInfo } from 'react-native';
// import * as Speech from 'expo-speech';
// import * as Haptics from 'expo-haptics';
// import { Audio } from 'expo-av';
// import axios from 'axios';

// const questions = [
//   {
//     key: 'crowdTolerance',
//     text: 'First question. How sensitive are you to crowded spaces? Please choose one of three levels: High, meaning you prefer quiet spaces. Medium, or Low, meaning crowds are fine.'
//   },
//   {
//     key: 'seatingPreference',
//     text: 'When you board a bus, which area do you prefer to sit in? The front, the middle, or the rear?'
//   },
//   {
//     key: 'conditionTriggers',
//     text: 'Are you concerned about the general condition of the bus? For example, problems like broken seats, visible trash, or loud engine noise.'
//   },
//   {
//     key: 'detailLevel',
//     text: 'How detailed should my descriptions of the route and surroundings be? Choose either Short, for just the facts, or Detailed, to include safety and other context.'
//   },
// ];

// const IP = 'IP';
// const GOOGLE_API_KEY = 'API-KEY';
// const COMMAND_DURATION_MS = 3000; // 3 seconds for voice command window

// export default function OnboardingScreen({ navigation, route }) {
//   const userId = route.params?.userId ?? 'test-user';
//   const [idx, setIdx] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [shouldSpeakNext, setShouldSpeakNext] = useState(true);
//   // State to hold the timeout reference for the 3-second voice command
//   const [commandTimeout, setCommandTimeout] = useState(null);

//   // --- Core Speech Logic ---
//   useEffect(() => {
//     if (!isAwaitingConfirmation && shouldSpeakNext) {
//       Speech.stop();
//       setIsSpeaking(true);
//       Speech.speak(questions[idx].text, {
//         rate: 0.9,
//         onDone: () => setIsSpeaking(false)
//       });
//       AccessibilityInfo.announceForAccessibility(
//         `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
//       );
//       setShouldSpeakNext(true);
//     }
//   }, [idx, isAwaitingConfirmation, shouldSpeakNext]);


//   // --- Voice Command/Answer Recording Logic ---

//   // Function to handle the actual transcription and command check
//   const processTranscription = async (uri, isCommandMode = false) => {
//     try {
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       const reader = new FileReader();

//       reader.onloadend = async () => {
//         const base64 = reader.result.split(',')[1];
//         const res = await fetch(
//           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               config: {
//                 encoding: 'WEBM_OPUS',
//                 sampleRateHertz: 48000,
//                 languageCode: 'en-US',
//               },
//               audio: { content: base64 },
//             }),
//           }
//         );
//         const data = await res.json();
//         const text = (data.results?.[0]?.alternatives?.[0]?.transcript || '').trim().toLowerCase();

//         if (isCommandMode) {
//           // COMMAND MODE LOGIC
//           if (text.includes('proceed') || text.includes('confirm') || text.includes('save')) {
//             confirmAnswer();
//           } else if (text.includes('re-answer') || text.includes('cancel') || text.includes('no')) {
//             cancelAndReanswer();
//           } else {
//             // Fallback to manual buttons if command isn't clear
//             setIsSpeaking(true);
//             Speech.speak("I didn't catch that command. Please use the buttons below when ready.", {
//               onDone: () => setIsSpeaking(false)
//             });
//           }
//         } else {
//           // ANSWER MODE LOGIC
//           Speech.stop();
//           setIsSpeaking(true);
//           setAnswer(text);
//           setIsAwaitingConfirmation(true);
//           Speech.speak(`I heard, "${text}". Do you want to save this answer?`, {
//             onDone: () => setIsSpeaking(false)
//           });

//           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//           AccessibilityInfo.announceForAccessibility(`Recognized: ${text}. Awaiting confirmation.`);
//         }
//       };
//       reader.readAsDataURL(blob);
//     } catch (e) {
//       Alert.alert('Speech Recognition Error', 'Using fallback response');
//       // Fallback for Answer Mode
//       if (!isCommandMode) {
//         const mockResponses = ['low', 'rear', 'loud noises', 'Detailed'];
//         const mockAnswer = mockResponses[idx] || 'Medium';

//         Speech.stop();
//         setIsSpeaking(true);
//         setAnswer(mockAnswer);
//         setIsAwaitingConfirmation(true);
//         Speech.speak(`I suggest the answer, "${mockAnswer}". Do you want to save this answer?`, {
//           onDone: () => setIsSpeaking(false)
//         });
//       } else {
//         // Fallback for Command Mode
//         setIsSpeaking(true);
//         Speech.speak("Voice command failed. Please use the buttons below.", {
//           onDone: () => setIsSpeaking(false)
//         });
//       }
//     }
//     setRecording(null);
//   };


//   const startRecording = async () => {
//     // 🚨 FIX 1: Stop speech immediately on long press interaction
//     if (isSpeaking) {
//       Speech.stop();
//       setIsSpeaking(false);
//     }

//     // If already in confirmation (command mode), don't restart recording right away
//     if (isAwaitingConfirmation) return;

//     try {
//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Microphone Access', 'Please allow microphone access in Settings to use voice input.');
//         return;
//       }

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(recording);
//       setIsRecording(true);
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//       AccessibilityInfo.announceForAccessibility('Recording started');
//     } catch (err) {
//       Alert.alert('Error', 'Recording failed. Please try again.');
//     }
//   };

//   const stopRecording = async () => {
//     if (!recording) return;

//     // Clear the auto-stop timeout if it exists
//     if (commandTimeout) {
//       clearTimeout(commandTimeout);
//       setCommandTimeout(null);
//     }

//     setIsRecording(false);
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();

//     // If we are in confirmation mode, process the recording as a command
//     if (isAwaitingConfirmation) {
//       processTranscription(uri, true); // true for Command Mode
//     } else {
//       // Otherwise, process it as a regular answer
//       processTranscription(uri, false); // false for Answer Mode
//     }
//   };


//   // --- Confirmation Handlers ---

//   // NEW: This triggers the 3-second voice command listener upon entering the confirmation state
//   const startCommandListener = async () => {
//     // 🚨 FIX: Stop any system speech (like the previous question's prompt) before listening
//     Speech.stop();
//     setIsSpeaking(false);

//     // Ensure we are not already recording, then start a quick, silent recording
//     if (!isRecording) {
//       await startRecording();

//       // Announce the command prompt immediately after starting the recording
//       setIsSpeaking(true);
//       Speech.speak("Say 'proceed' or 're-answer' now.", {
//         onDone: () => setIsSpeaking(false)
//       });

//       // Set a timeout to automatically stop recording after 3 seconds
//       const timeout = setTimeout(stopRecording, COMMAND_DURATION_MS);
//       setCommandTimeout(timeout);
//     }
//   };


//   // Run the command listener right after entering the confirmation state
//   useEffect(() => {
//     if (isAwaitingConfirmation) {
//       startCommandListener();
//     }
//     // Cleanup function
//     return () => {
//       if (commandTimeout) {
//         clearTimeout(commandTimeout);
//       }
//     };
//   }, [isAwaitingConfirmation]);


//   const confirmAnswer = () => {
//     Speech.stop();
//     setIsSpeaking(false);
//     setIsAwaitingConfirmation(false);
//     setShouldSpeakNext(true);
//     saveAndNext();
//   };

//   const cancelAndReanswer = () => {
//     Speech.stop();
//     setIsSpeaking(false);

//     setAnswer('');
//     setIsAwaitingConfirmation(false);

//     // Announce the re-answer instruction and question
//     const speechText = `Please re-answer the question: ${questions[idx].text}`;
//     setIsSpeaking(true);
//     Speech.speak(speechText, {
//       onDone: () => setIsSpeaking(false)
//     });
//     AccessibilityInfo.announceForAccessibility("Answer cancelled. Please record again.");
//     setShouldSpeakNext(false);
//   };

//   // --- Navigation/Save Logic ---
//   const saveAndNext = async () => {
//     if (isRecording) {
//       setIsRecording(false);
//     }

//     const q = questions[idx];

//     if (!answer.trim()) {
//       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
//       return;
//     }

//     try {
//       await axios.post(`http://${IP}:8000/store-preference`, {
//         userId,
//         key: q.key,
//         value: (answer || 'skipped').toLowerCase().trim(),
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     } catch (e) {
//       Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
//       return;
//     }

//     if (idx < questions.length - 1) {
//       setIdx(idx + 1);
//       setAnswer('');
//       setIsAwaitingConfirmation(false);
//     } else {
//       setIsSpeaking(true);
//       Speech.speak('Welcome to VisionaryGuide! Setup complete.', {
//         onDone: () => setIsSpeaking(false)
//       });
//       navigation.replace('Landing', { userId });
//     }
//   };

//   const progress = ((idx + 1) / questions.length) * 100;

//   // ----------------------------------------------------
//   // CONFIRMATION SCREEN RENDER
//   // ----------------------------------------------------
//   if (isAwaitingConfirmation) {
//     return (
//       // The Pressable is now primarily used for blocking interaction while listening/speaking
//       <RNPressable
//         style={{ flex: 1 }}
//         accessible={true}
//         accessibilityLabel="Confirmation screen. Say 'proceed' or 're-answer' now, or use the buttons below."
//         // Temporarily disable longPress handlers as the 3-second auto-record handles command input
//         onLongPress={() => { }}
//         onPressOut={() => { }}
//         pointerEvents={isRecording || isSpeaking ? 'none' : 'auto'}
//       >
//         <View style={[styles.scrollContainer, styles.confirmationContainer]}>
//           <Text style={styles.confirmationTitle}>Confirm Your Answer</Text>
//           <View style={styles.queryBox}>
//             <Text style={styles.queryText}>"{answer}"</Text>
//           </View>
//           <Text style={styles.confirmationPrompt}>
//             {isRecording ? "Listening for command..." : isSpeaking ? "System speaking..." : "Use the buttons below to continue."}
//           </Text>

//           <View style={styles.buttonContainer}>
//             <RNPressable style={[styles.confirmButton, styles.proceedButton]} onPress={confirmAnswer} disabled={isRecording || isSpeaking}>
//               <Text style={styles.buttonText}>Proceed</Text>
//             </RNPressable>
//             <RNPressable style={[styles.confirmButton, styles.cancelButton]} onPress={cancelAndReanswer} disabled={isRecording || isSpeaking}>
//               <Text style={styles.buttonText}>Re-answer</Text>
//             </RNPressable>
//           </View>
//           <Text style={styles.helperText}>
//             💡 Note: Voice commands are automatically attempted on this screen.
//           </Text>
//         </View>
//       </RNPressable>
//     );
//   }

//   return (
//     <RNPressable
//       style={{ flex: 1 }}
//       accessible={true}
//       accessibilityLabel="Onboarding questionnaire"
//       onLongPress={startRecording}
//       onPressOut={stopRecording}
//       // Disable touch events when recording OR speaking is active
//       pointerEvents={isRecording || isSpeaking ? 'none' : 'auto'}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         scrollEventThrottle={16}
//       >
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text
//               style={styles.logo}
//               accessible={true}
//               accessibilityRole="header"
//               accessibilityLabel="VisionaryGuide Setup"
//             >
//               VisionaryGuide
//             </Text>
//             <Text
//               style={styles.subtitle}
//               accessible={true}
//               accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}
//             >
//               Let's personalize your experience
//             </Text>
//           </View>

//           {/* Progress Bar */}
//           <View
//             style={styles.progressContainer}
//             accessible={true}
//             accessibilityRole="progressbar"
//             accessibilityLabel={`Progress: ${Math.round(progress)}% complete`}
//             accessibilityValue={{ now: progress, min: 0, max: 100 }}
//           >
//             <View style={styles.progressBar}>
//               <View style={[styles.progressFill, { width: `${progress}%` }]} />
//             </View>
//             <Text style={styles.progressText}>
//               {idx + 1} / {questions.length}
//             </Text>
//           </View>

//           {/* Question Card */}
//           <View style={styles.questionCard}>
//             <Text
//               style={styles.questionLabel}
//               accessible={true}
//               accessibilityRole="text"
//             >
//               Question {idx + 1}
//             </Text>
//             <Text
//               style={styles.questionText}
//               accessible={true}
//               accessibilityRole="text"
//               accessibilityLabel={questions[idx].text}
//             >
//               {questions[idx].text}
//             </Text>
//           </View>

//           {/* Answer Input */}
//           <View style={styles.inputContainer}>
//             <Text
//               style={styles.inputLabel}
//               accessible={true}
//             >
//               Your Answer
//             </Text>
//             <TextInput
//               style={styles.input}
//               value={answer}
//               onChangeText={setAnswer}
//               placeholder="Type your answer here..."
//               placeholderTextColor="#999"
//               accessible={true}
//               accessibilityLabel="Answer input field"
//               accessibilityHint="Enter your answer or use voice input below"
//               multiline
//               numberOfLines={3}
//               // Disable manual input when recording or speaking
//               editable={!isRecording && !isSpeaking}
//             />
//           </View>

//           {/* Voice Input Indicator */}
//           <View
//             style={[
//               styles.micButton,
//               isRecording && styles.micRecording,
//               // Visually indicate when the button is locked due to speaking
//               isSpeaking && { opacity: 0.5, backgroundColor: '#666' }
//             ]}
//             accessible={true}
//             accessibilityRole="text"
//             accessibilityLabel={isRecording ? 'Recording in progress' : isSpeaking ? 'System is speaking, recording is paused' : 'Press and hold anywhere on screen to record'}
//           >
//             <View style={styles.micButtonContent}>
//               <View style={styles.micIcon}>
//                 <Text style={styles.micIconText}>🎤</Text>
//               </View>
//               <Text style={styles.micText}>
//                 {isRecording ? 'Recording...' : isSpeaking ? 'System Speaking...' : 'Hold Anywhere to Speak'}
//               </Text>
//             </View>
//           </View>

//           {/* Navigation Buttons */}
//           <View style={styles.buttonRow}>
//             <RNPressable
//               style={({ pressed }) => [
//                 styles.nextButton,
//                 pressed && styles.nextPressed
//               ]}
//               onPress={saveAndNext}
//               disabled={isRecording || isSpeaking}
//               accessible={true}
//               accessibilityRole="button"
//               accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
//               accessibilityHint="Saves your answer and continues"
//             >
//               <Text style={styles.nextText}>
//                 {idx < questions.length - 1 ? 'Next' : 'Complete'}
//               </Text>
//             </RNPressable>
//           </View>

//           {/* Helper Text */}
//           <Text
//             style={styles.helperText}
//             accessible={true}
//             accessibilityRole="text"
//           >
//             💡 Tip: Hold **anywhere** on the screen to speak your answer
//           </Text>
//         </View>
//       </ScrollView>
//     </RNPressable>
//   );
// }

// const styles = StyleSheet.create({
//   // ... (All styles are included below for completeness) ...
//   scrollContainer: {
//     flexGrow: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   container: {
//     flex: 1,
//     padding: 24,
//     paddingTop: 60,
//   },
//   header: {
//     marginBottom: 32,
//     alignItems: 'center',
//   },
//   logo: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#1A1A1A',
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   progressContainer: {
//     marginBottom: 32,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 4,
//     overflow: 'hidden',
//     marginBottom: 8,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#007AFF',
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'right',
//     fontWeight: '600',
//   },
//   questionCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   questionLabel: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '700',
//     marginBottom: 12,
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//   },
//   questionText: {
//     fontSize: 20,
//     color: '#1A1A1A',
//     lineHeight: 28,
//     fontWeight: '600',
//   },
//   inputContainer: {
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//     padding: 16,
//     borderRadius: 12,
//     fontSize: 16,
//     minHeight: 80,
//     textAlignVertical: 'top',
//     color: '#1A1A1A',
//   },
//   micButton: {
//     backgroundColor: '#FF9500',
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: '#FF9500',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   micPressed: {
//     backgroundColor: '#CC7700',
//     transform: [{ scale: 0.97 }],
//   },
//   micRecording: {
//     backgroundColor: '#FF3B30',
//     shadowColor: '#FF3B30',
//   },
//   micButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 18,
//   },
//   micIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   micIconText: {
//     fontSize: 20,
//   },
//   micText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//     fontSize: 18,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   nextButton: {
//     flex: 1,
//     backgroundColor: '#34C759',
//     padding: 18,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#34C759',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   nextPressed: {
//     backgroundColor: '#2a9d4f',
//     transform: [{ scale: 0.97 }],
//   },
//   nextText: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//     fontSize: 18,
//   },
//   helperText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   confirmationContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     backgroundColor: '#1C1C1E',
//   },
//   confirmationTitle: {
//     fontSize: 26,
//     fontWeight: '900',
//     color: 'white',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   queryBox: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 25,
//     borderRadius: 15,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   queryText: {
//     fontSize: 22,
//     color: '#007AFF',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   confirmationPrompt: {
//     fontSize: 18,
//     color: '#A0A0A0',
//     marginBottom: 50,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   confirmButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     width: '48%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   proceedButton: {
//     backgroundColor: '#34C759',
//   },
//   cancelButton: {
//     backgroundColor: '#FF3B30',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });

// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TextInput, StyleSheet, Alert, Pressable as RNPressable, ScrollView, AccessibilityInfo } from 'react-native';
// import * as Speech from 'expo-speech';
// import * as Haptics from 'expo-haptics';
// import { Audio } from 'expo-av';
// import axios from 'axios';

// const questions = [
//   {
//     key: 'crowdTolerance',
//     text: 'First question. How sensitive are you to crowded spaces? Please choose one of three levels: High, meaning you prefer quiet spaces. Medium, or Low, meaning crowds are fine.'
//   },
//   {
//     key: 'seatingPreference',
//     text: 'When you board a bus, which area do you prefer to sit in? The front, the middle, or the rear?'
//   },
//   {
//     key: 'conditionTriggers',
//     text: 'Are you concerned about the general condition of the bus? For example, problems like broken seats, visible trash, or loud engine noise.'
//   },
//   {
//     key: 'detailLevel',
//     text: 'How detailed should my descriptions of the route and surroundings be? Choose either Short, for just the facts, or Detailed, to include safety and other context.'
//   },
// ];

// const IP = 'IP'; // IMPORTANT: Verify this IP matches your local server
// const GOOGLE_API_KEY = 'API-KEY';
// const COMMAND_DURATION_MS = 3000; // 3 seconds for voice command window

// export default function OnboardingScreen({ navigation, route }) {
//   const userId = route.params?.userId ?? 'test-user';
//   const [idx, setIdx] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [recording, setRecording] = useState(null);
//   const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [shouldSpeakNext, setShouldSpeakNext] = useState(true);
//   const [commandTimeout, setCommandTimeout] = useState(null);

//   // --- Confirmation Handlers (Defined first for use in useCallback) ---
//   const confirmAnswer = useCallback(() => {
//     Speech.stop();
//     setIsSpeaking(false);
//     setIsAwaitingConfirmation(false);
//     setShouldSpeakNext(true);
//     saveAndNext();
//   }, [idx, answer]);

//   const cancelAndReanswer = useCallback(() => {
//     Speech.stop();
//     setIsSpeaking(false);

//     setAnswer('');
//     setIsAwaitingConfirmation(false);

//     const speechText = `Please re-answer the question: ${questions[idx].text}`;
//     setIsSpeaking(true);
//     Speech.speak(speechText, {
//       onDone: () => setIsSpeaking(false)
//     });
//     AccessibilityInfo.announceForAccessibility("Answer cancelled. Please record again.");
//     setShouldSpeakNext(false);
//   }, [idx]);


//   // --- Voice Command/Answer Recording Logic ---

//   // Helper function to handle transcription
//   const processTranscription = useCallback(async (uri, isCommandMode = false, currentIdx) => {
//     try {
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       const reader = new FileReader();

//       reader.onloadend = async () => {
//         const base64 = reader.result.split(',')[1];
//         const res = await fetch(
//           `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               config: { encoding: 'WEBM_OPUS', sampleRateHertz: 48000, languageCode: 'en-US' },
//               audio: { content: base64 },
//             }),
//           }
//         );
//         const data = await res.json();
//         const text = (data.results?.[0]?.alternatives?.[0]?.transcript || '').trim().toLowerCase();

//         if (isCommandMode) {
//           // COMMAND MODE LOGIC
//           if (text.includes('proceed') || text.includes('confirm') || text.includes('save')) {
//             confirmAnswer();
//           } else if (text.includes('re-answer') || text.includes('cancel') || text.includes('no')) {
//             cancelAndReanswer();
//           } else {
//             // Fallback to manual buttons if command isn't clear
//             setIsSpeaking(true);
//             Speech.speak("I didn't catch that command. Please use the buttons below when ready.", {
//               onDone: () => setIsSpeaking(false)
//             });
//           }
//         } else {
//           // ANSWER MODE LOGIC - Chain confirmation display after speech ends
//           setAnswer(text);
//           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//           AccessibilityInfo.announceForAccessibility(`Recognized: ${text}. Awaiting confirmation.`);

//           Speech.stop();
//           setIsSpeaking(true);
//           Speech.speak(`I heard, "${text}". Do you want to save this answer?`, {
//             onDone: () => {
//               setIsSpeaking(false);
//               setIsAwaitingConfirmation(true); // Now transition the screen
//             }
//           });
//         }
//       };
//       reader.readAsDataURL(blob);
//     } catch (e) {
//       Alert.alert('Speech Recognition Error', 'Using fallback response');
//       // Fallback logic for answer mode
//       if (!isCommandMode) {
//         const mockResponses = ['low', 'rear', 'loud noises', 'Detailed'];
//         const mockAnswer = mockResponses[currentIdx] || 'Medium';

//         Speech.stop();
//         setIsSpeaking(true);
//         setAnswer(mockAnswer);
//         Speech.speak(`I suggest the answer, "${mockAnswer}". Do you want to save this answer?`, {
//           onDone: () => {
//             setIsSpeaking(false);
//             setIsAwaitingConfirmation(true);
//           }
//         });
//       } else {
//         // Fallback for Command Mode
//         setIsSpeaking(true);
//         Speech.speak("Voice command failed. Please use the buttons below.", {
//           onDone: () => setIsSpeaking(false)
//         });
//       }
//     }
//     // NOTE: setRecording(null) is handled in stopAndCleanupRecording before this function is called
//   }, [confirmAnswer, cancelAndReanswer]);


//   // Starts the recording session (used for both manual and automatic command)
//   const setupRecording = async () => {
//     try {
//       // Check for permissions
//       const { status } = await Audio.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert(
//           'Microphone Access Required',
//           'Please grant microphone access in your device settings to use voice input.'
//         );
//         return null;
//       }

//       // Set the audio mode
//       await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

//       // Create the recording
//       const { recording: newRecording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );
//       setRecording(newRecording);
//       setIsRecording(true);
//       return newRecording;
//     } catch (err) {
//       console.error('Failed to start recording:', err);
//       Alert.alert('Error', 'Recording failed to start. Check console for details or ensure permissions are granted.');
//       return null;
//     }
//   };

//   // New cleanup function to ensure state is cleared *before* the next recording attempt
//   const stopAndCleanupRecording = async (currentRecording, isCommandMode) => {
//     if (commandTimeout) {
//       clearTimeout(commandTimeout);
//       setCommandTimeout(null);
//     }

//     setIsRecording(false);

//     // Ensure we stop and unload the current object
//     await currentRecording.stopAndUnloadAsync();
//     const uri = currentRecording.getURI();

//     // CRITICAL FIX: Set the state to null to release the object, resolving the error.
//     setRecording(null);

//     // Now that cleanup is done, process the transcription
//     processTranscription(uri, isCommandMode, idx);
//   }


//   // Start a manual answer recording (Long press on Question screen)
//   const startRecording = async () => {
//     if (isSpeaking) { Speech.stop(); setIsSpeaking(false); }
//     if (isAwaitingConfirmation) return;

//     // This check is the original reason for the bug: it stops the immediate attempt
//     if (recording) {
//       console.log('Skipping startRecording: already have a recording object.');
//       return;
//     }

//     const rec = await setupRecording();
//     if (rec) {
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//       AccessibilityInfo.announceForAccessibility('Recording started');
//     }
//   };

//   // Stops the recording session (now just calls cleanup)
//   const stopRecording = async () => {
//     if (!recording) return;
//     await stopAndCleanupRecording(recording, isAwaitingConfirmation);
//   };


//   // Implements the automatic 3-second voice command listener
//   const startCommandListener = async () => {
//     Speech.stop();
//     setIsSpeaking(false);

//     // Announce the command prompt first 
//     setIsSpeaking(true);
//     Speech.speak("Say 'proceed' or 're-answer' now.", {
//       onDone: async () => {
//         setIsSpeaking(false);

//         // Wait slightly for speech state to settle (optional, but good for stability)
//         await new Promise(resolve => setTimeout(resolve, 100));

//         // Now, start the recording for 3 seconds
//         const rec = await setupRecording();
//         if (rec) {
//           // Set a timeout to automatically stop recording after 3 seconds
//           const timeout = setTimeout(() => {
//             // Pass the specific recording object to cleanup
//             stopAndCleanupRecording(rec, isAwaitingConfirmation);
//           }, COMMAND_DURATION_MS);
//           setCommandTimeout(timeout);
//         }
//       }
//     });
//   };

//   // --- Core Speech Logic: Announce New Question ---
//   useEffect(() => {
//     if (!isAwaitingConfirmation && shouldSpeakNext) {
//       Speech.stop();
//       setIsSpeaking(true);
//       Speech.speak(questions[idx].text, {
//         rate: 0.9,
//         onDone: () => setIsSpeaking(false)
//       });
//       AccessibilityInfo.announceForAccessibility(
//         `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
//       );
//       setShouldSpeakNext(true);
//     }
//   }, [idx, isAwaitingConfirmation, shouldSpeakNext]);

//   // Run the command listener right after entering the confirmation state
//   useEffect(() => {
//     if (isAwaitingConfirmation) {
//       startCommandListener();
//     }
//     return () => {
//       if (commandTimeout) {
//         clearTimeout(commandTimeout);
//       }
//     };
//   }, [isAwaitingConfirmation]);


//   // --- Navigation/Save Logic ---
//   const saveAndNext = async () => {
//     if (isRecording) { setIsRecording(false); }
//     const q = questions[idx];

//     if (!answer.trim()) {
//       Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
//       return;
//     }

//     try {
//       await axios.post(`http://${IP}:8000/store-preference`, {
//         userId,
//         key: q.key,
//         value: (answer || 'skipped').toLowerCase().trim(),
//       }, { headers: { 'Content-Type': 'application/json' } });
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     } catch (e) {
//       Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
//       return;
//     }

//     // Last Question Repeat Fix: Stop speech BEFORE navigation/next question logic
//     Speech.stop();
//     setIsSpeaking(false);

//     if (idx < questions.length - 1) {
//       setIdx(idx + 1);
//       setAnswer('');
//       setIsAwaitingConfirmation(false);
//     } else {
//       // Final screen logic
//       setIsSpeaking(true);
//       Speech.speak('Welcome to VisionaryGuide! Setup complete.', {
//         onDone: () => {
//           setIsSpeaking(false);
//           navigation.replace('Landing', { userId });
//         }
//       });
//     }
//   };

//   const progress = ((idx + 1) / questions.length) * 100;

//   // ----------------------------------------------------
//   // CONFIRMATION SCREEN RENDER
//   // ----------------------------------------------------
//   if (isAwaitingConfirmation) {
//     return (
//       <RNPressable
//         style={{ flex: 1 }}
//         accessible={true}
//         accessibilityLabel="Confirmation screen. Your recorded answer is shown. Say 'proceed' or 're-answer' now, or use the buttons below."
//       >
//         <View style={[styles.scrollContainer, styles.confirmationContainer]}>
//           <Text style={styles.confirmationTitle}>Confirm Your Answer</Text>
//           <View style={styles.queryBox}>
//             <Text style={styles.queryText}>"{answer}"</Text>
//           </View>
//           <Text style={styles.confirmationPrompt}>
//             {isRecording ? "Listening for command..." : isSpeaking ? "System speaking instructions..." : "Command listener finished. Use the buttons below to continue."}
//           </Text>

//           <View style={styles.buttonContainer}>
//             {/* Buttons are disabled if a voice command attempt is active */}
//             <RNPressable style={[styles.confirmButton, styles.proceedButton]} onPress={confirmAnswer} disabled={isRecording || isSpeaking}>
//               <Text style={styles.buttonText}>Proceed</Text>
//             </RNPressable>
//             <RNPressable style={[styles.confirmButton, styles.cancelButton]} onPress={cancelAndReanswer} disabled={isRecording || isSpeaking}>
//               <Text style={styles.buttonText}>Re-answer</Text>
//             </RNPressable>
//           </View>
//           <Text style={styles.helperText}>
//             💡 Voice commands are automatically attempted when this screen loads.
//           </Text>
//         </View>
//       </RNPressable>
//     );
//   }

//   return (
//     <RNPressable
//       style={{ flex: 1 }}
//       accessible={true}
//       accessibilityLabel="Onboarding questionnaire"
//       onLongPress={startRecording}
//       onPressOut={stopRecording}
//       // Disable touch events when recording OR speaking is active
//       pointerEvents={isRecording || isSpeaking ? 'none' : 'auto'}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         scrollEventThrottle={16}
//       >
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.logo} accessible={true} accessibilityRole="header" accessibilityLabel="Visionary Guide Setup">Visionary Guide</Text>
//             <Text style={styles.subtitle} accessible={true} accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}>Let's personalize your experience</Text>
//           </View>

//           {/* Progress Bar */}
//           <View style={styles.progressContainer} accessible={true} accessibilityRole="progressbar" accessibilityLabel={`Progress: ${Math.round(progress)}% complete`} accessibilityValue={{ now: progress, min: 0, max: 100 }}>
//             <View style={styles.progressBar}>
//               <View style={[styles.progressFill, { width: `${progress}%` }]} />
//             </View>
//             <Text style={styles.progressText}>{idx + 1} / {questions.length}</Text>
//           </View>

//           {/* Question Card */}
//           <View style={styles.questionCard}>
//             <Text style={styles.questionLabel} accessible={true} accessibilityRole="text">Question {idx + 1}</Text>
//             <Text style={styles.questionText} accessible={true} accessibilityRole="text" accessibilityLabel={questions[idx].text}>{questions[idx].text}</Text>
//           </View>

//           {/* Answer Input */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel} accessible={true}>Your Answer</Text>
//             <TextInput style={styles.input} value={answer} onChangeText={setAnswer} placeholder="Type your answer here..." placeholderTextColor="#999" accessible={true} accessibilityLabel="Answer input field" accessibilityHint="Enter your answer or use voice input below" multiline numberOfLines={3} editable={!isRecording && !isSpeaking} />
//           </View>

//           {/* Voice Input Indicator */}
//           <View
//             style={[
//               styles.micButton,
//               isRecording && styles.micRecording,
//               isSpeaking && { opacity: 0.5, backgroundColor: '#666' }
//             ]}
//             accessible={true}
//             accessibilityRole="text"
//             accessibilityLabel={isRecording ? 'Recording in progress' : isSpeaking ? 'System is speaking, recording is paused' : 'Press and hold anywhere on screen to record'}
//           >
//             <View style={styles.micButtonContent}>
//               <View style={styles.micIcon}>
//                 <Text style={styles.micIconText}>🎤</Text>
//               </View>
//               <Text style={styles.micText}>
//                 {isRecording ? 'Recording...' : isSpeaking ? 'System Speaking...' : 'Hold Anywhere to Speak'}
//               </Text>
//             </View>
//           </View>

//           {/* Navigation Buttons */}
//           <View style={styles.buttonRow}>
//             <RNPressable
//               style={({ pressed }) => [
//                 styles.nextButton,
//                 pressed && styles.nextPressed
//               ]}
//               onPress={saveAndNext}
//               disabled={isRecording || isSpeaking}
//               accessible={true}
//               accessibilityRole="button"
//               accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
//               accessibilityHint="Saves your answer and continues"
//             >
//               <Text style={styles.nextText}>
//                 {idx < questions.length - 1 ? 'Next' : 'Complete'}
//               </Text>
//             </RNPressable>
//           </View>

//           {/* Helper Text */}
//           <Text
//             style={styles.helperText}
//             accessible={true}
//             accessibilityRole="text"
//           >
//             💡 Tip: Hold anywhere on the screen to speak your answer
//           </Text>
//         </View>
//       </ScrollView>
//     </RNPressable>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: { flexGrow: 1, backgroundColor: '#F8F9FA', },
//   container: { flex: 1, padding: 24, paddingTop: 60, },
//   header: { marginBottom: 32, alignItems: 'center', },
//   logo: { fontSize: 32, fontWeight: '800', color: '#1A1A1A', marginBottom: 8, letterSpacing: 0.5, },
//   subtitle: { fontSize: 16, color: '#666', textAlign: 'center', },
//   progressContainer: { marginBottom: 32, },
//   progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 8, },
//   progressFill: { height: '100%', backgroundColor: '#007AFF', borderRadius: 4, },
//   progressText: { fontSize: 14, color: '#666', textAlign: 'right', fontWeight: '600', },
//   questionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, },
//   questionLabel: { fontSize: 14, color: '#007AFF', fontWeight: '700', marginBottom: 12, letterSpacing: 0.5, textTransform: 'uppercase', },
//   questionText: { fontSize: 16, color: '#1A1A1A', lineHeight: 28, fontWeight: '600', },
//   inputContainer: { marginBottom: 24, },
//   inputLabel: { fontSize: 14, color: '#666', fontWeight: '600', marginBottom: 8, },
//   input: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E0E0E0', padding: 16, borderRadius: 12, fontSize: 16, minHeight: 80, textAlignVertical: 'top', color: '#1A1A1A', },
//   micButton: { backgroundColor: '#FF9500', borderRadius: 16, marginBottom: 16, shadowColor: '#FF9500', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, },
//   micPressed: { backgroundColor: '#CC7700', transform: [{ scale: 0.97 }], },
//   micRecording: { backgroundColor: '#FF3B30', shadowColor: '#FF3B30', },
//   micButtonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, },
//   micIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12, },
//   micIconText: { fontSize: 20, },
//   micText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18, },
//   buttonRow: { flexDirection: 'row', marginBottom: 16, },
//   nextButton: { flex: 1, backgroundColor: '#34C759', padding: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#34C759', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, },
//   nextPressed: { backgroundColor: '#2a9d4f', transform: [{ scale: 0.97 }], },
//   nextText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18, },
//   helperText: { fontSize: 14, color: '#666', textAlign: 'center', fontStyle: 'italic', },
//   confirmationContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#1C1C1E', },
//   confirmationTitle: { fontSize: 26, fontWeight: '900', color: 'white', marginBottom: 30, textAlign: 'center', },
//   queryBox: { backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 25, borderRadius: 15, width: '100%', alignItems: 'center', marginBottom: 30, },
//   queryText: { fontSize: 22, color: '#007AFF', fontWeight: '600', textAlign: 'center', fontStyle: 'italic', },
//   confirmationPrompt: { fontSize: 18, color: '#A0A0A0', marginBottom: 50, fontWeight: '500', textAlign: 'center', },
//   buttonContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', },
//   confirmButton: { paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12, width: '48%', alignItems: 'center', justifyContent: 'center', },
//   proceedButton: { backgroundColor: '#34C759', },
//   cancelButton: { backgroundColor: '#FF3B30', },
//   buttonText: { color: 'white', fontSize: 18, fontWeight: '700', },
// });

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable as RNPressable, ScrollView, AccessibilityInfo } from 'react-native';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import axios from 'axios';

const questions = [
  {
    key: 'crowdTolerance',
    text: 'First question. How sensitive are you to crowded spaces? Please choose one of three levels: High, meaning you prefer quiet spaces. Medium, or Low, meaning crowds are fine.'
  },
  {
    key: 'seatingPreference',
    text: 'When you board a bus, which area do you prefer to sit in? The front, the middle, or the rear?'
  },
  {
    key: 'conditionTriggers',
    text: 'Are you concerned about the general condition of the bus? For example, problems like broken seats, visible trash, or loud engine noise.'
  },
  {
    key: 'detailLevel',
    text: 'How detailed should my descriptions of the route and surroundings be? Choose either Short, for just the facts, or Detailed, to include safety and other context.'
  },
];

const IP = 'IP'; // IMPORTANT: Verify this IP matches your local server
const GOOGLE_API_KEY = 'API-KEY';

export default function OnboardingScreen({ navigation, route }) {
  const userId = route.params?.userId ?? 'test-user';
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shouldSpeakNext, setShouldSpeakNext] = useState(true);



  // --- Confirmation Handlers ---
  const saveAndNext = async () => {
    if (isRecording) { setIsRecording(false); }
    const q = questions[idx];

    if (!answer.trim()) {
      Alert.alert('Answer Required', 'Please provide an answer or say "skip" to continue.');
      return;
    }

    Speech.stop();

    try {
      await axios.post(`http://${IP}:8000/store-preference`, {
        userId,
        key: q.key,
        value: (answer || 'skipped').toLowerCase().trim(),
      }, { headers: { 'Content-Type': 'application/json' } });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      Alert.alert('Save Failed', `Could not reach backend: ${e.message}. Check if server is running on ${IP}:8000.`);
      return;
    }

    setIsSpeaking(false);

    if (idx < questions.length - 1) {
      setAnswer('');
      setIsAwaitingConfirmation(false);
      setIdx(idx + 1);
      setShouldSpeakNext(true);
    } else {
      navigation.replace('Landing', { userId });
      Speech.speak('Welcome to VisionaryGuide! Setup complete.', {
        onDone: () => { setIsSpeaking(false); }
      });
    }
  };


  const confirmAnswer = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
    setIsAwaitingConfirmation(false);
    setShouldSpeakNext(false);
    saveAndNext();
  }, [idx, answer]);

  const cancelAndReanswer = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);

    setAnswer('');
    setIsAwaitingConfirmation(false);

    const speechText = `Please re-answer the question: ${questions[idx].text}`;
    setIsSpeaking(true);
    Speech.speak(speechText, {
      onDone: () => setIsSpeaking(false)
    });
    AccessibilityInfo.announceForAccessibility("Answer cancelled. Please record again.");
    setShouldSpeakNext(true);
  }, [idx]);


  // --- Voice Command/Answer Recording Logic ---

  // Helper function to handle transcription
  const processTranscription = useCallback(async (uri, isCommandMode = false) => {
    // Ensure we are not recording anymore
    setIsRecording(false);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        const res = await fetch(
          `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              config: { encoding: 'WEBM_OPUS', sampleRateHertz: 48000, languageCode: 'en-US' },
              audio: { content: base64 },
            }),
          }
        );
        const data = await res.json();
        const text = (data.results?.[0]?.alternatives?.[0]?.transcript || '').trim().toLowerCase();

        if (isCommandMode) {
          // 🛑 COMMAND MODE DISABLED: User must use the buttons.
          setIsSpeaking(true);
          Speech.speak("Please use the 'Proceed' or 'Re-answer' buttons below to continue.", {
            onDone: () => setIsSpeaking(false)
          });
          return;
        } else {
          // ANSWER MODE LOGIC 
          if (!text) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Speech.stop();
            setIsSpeaking(true);
            Speech.speak("I heard nothing. Please hold the screen and speak your answer clearly when you hear the chime.", {
              onDone: () => setIsSpeaking(false)
            });
            return;
          }

          setAnswer(text);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          setIsAwaitingConfirmation(true);
          setIsSpeaking(true);

          Speech.speak(`I heard, "${text}". Do you want to save this answer?`, {
            onDone: () => {
              setIsSpeaking(false);
            }
          });
        }
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      Alert.alert('Speech Recognition Error', 'Using fallback response');
      if (!isCommandMode) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Speech.stop();
        setIsSpeaking(true);
        Speech.speak("I could not connect to the speech service. Please try recording again, or use the text box.", {
          onDone: () => setIsSpeaking(false)
        });
        setIsAwaitingConfirmation(false);
      } else {
        setIsSpeaking(true);
        Speech.speak("Voice input failed. Please use the buttons below.", {
          onDone: () => setIsSpeaking(false)
        });
      }
    }
  }, [confirmAnswer, cancelAndReanswer]);


  // Starts the recording session 
  const setupRecording = async () => {
    try {
      // 1. AGGRESSIVE CLEANUP: Ensure any lingering object is destroyed before creation.
      if (recording) {
        console.log("Unloading lingering object before setup.");
        await recording.stopAndUnloadAsync();
        setRecording(null);
        setIsRecording(false);
        // Force a small pause to allow OS to release the resource
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // 2. GET PERMISSION
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Microphone Access Required', 'Please grant microphone access.');
        return null;
      }

      // 3. FORCE AUDIO MODE RESET (Active recording mode - USING NUMERICAL CONSTANTS)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        // 0 = DO_NOT_MIX (iOS default we were trying to set)
        interruptionModeIOS: 0,
        // 2 = DO_NOT_MIX (Android constant fix)
        interruptionModeAndroid: 2,
      });

      // 4. CREATE NEW RECORDING OBJECT
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      return newRecording;
    } catch (err) {
      console.error('Failed to start recording:', err);
      // If creation fails, ensure states are false
      setRecording(null);
      setIsRecording(false);
      return null;
    }
  };

  // Stops the recording session
  const stopAndCleanupRecording = async (currentRecording, isCommandMode) => {
    if (!currentRecording) return null;

    // Step 1: Stop and unload the object (releases URI)
    await currentRecording.stopAndUnloadAsync();
    const uri = currentRecording.getURI();

    // Step 2: Immediately clear the recording object state 
    setRecording(null);
    setIsRecording(false);

    // CRITICAL STEP: Reset audio mode (USING NUMERICAL CONSTANTS)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false, // Turn off recording mode
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      // 0 = DO_NOT_MIX (iOS)
      interruptionModeIOS: 0,
      // 2 = DO_NOT_MIX (Android)
      interruptionModeAndroid: 2,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });


    return uri;
  }


  // Manual start recording (used for question answering)
  const startRecording = async () => {
    // Explicitly prevent recording if on confirmation screen or system is speaking
    if (isSpeaking || isAwaitingConfirmation) return;

    const rec = await setupRecording();
    if (rec) {
      setIsRecording(true); // ⭐ Only set state if setup was successful
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      AccessibilityInfo.announceForAccessibility('Recording started');
    }
  };

  // Manual stop recording (used for question answering)
  const stopRecording = async () => {
    if (!recording) return;

    // Stop the recording and get the URI
    const uri = await stopAndCleanupRecording(recording, isAwaitingConfirmation);

    // CRITICAL: Small delay to ensure native resource is fully released before transcription starts
    await new Promise(resolve => setTimeout(resolve, 50));

    if (uri) {
      processTranscription(uri, isAwaitingConfirmation);
    }
  };


  // --- Core Speech Logic: Announce New Question ---
  useEffect(() => {
    if (!isAwaitingConfirmation && shouldSpeakNext) {
      Speech.stop();
      setIsSpeaking(true);
      Speech.speak(questions[idx].text, {
        rate: 0.9,
        onDone: () => setIsSpeaking(false)
      });
      AccessibilityInfo.announceForAccessibility(
        `Question ${idx + 1} of ${questions.length}. ${questions[idx].text}`
      );
      setShouldSpeakNext(true);
    }
  }, [idx, isAwaitingConfirmation, shouldSpeakNext]);

  // Clean up only on component unmount
  useEffect(() => {
    return () => {
      Speech.stop();
      // If a recording object is still active, make sure to unload it.
      if (recording) {
        recording.stopAndUnloadAsync().catch(e => console.log("Failed to unload on unmount:", e));
      }
    };
  }, [recording]);


  const progress = ((idx + 1) / questions.length) * 100;

  // ----------------------------------------------------
  // RENDER 
  // ----------------------------------------------------
  if (isAwaitingConfirmation) {
    return (
      <View // ⬅️ Using a View ensures no accidental touch-to-record events are possible
        style={[styles.scrollContainer, styles.confirmationContainer]}
        accessible={true}
        accessibilityLabel="Confirmation screen. Your recorded answer is shown."
      >
        <Text style={styles.confirmationTitle}>Confirm Your Answer</Text>
        <View style={styles.queryBox}>
          <Text style={styles.queryText}>"{answer}"</Text>
        </View>
        <Text style={styles.confirmationPrompt}>
          {isSpeaking ? "System speaking instructions..." : "Please use the buttons below to proceed or re-answer."}
        </Text>

        <View style={styles.buttonContainer}>
          {/* Buttons are disabled only when the system is speaking or recording */}
          <RNPressable style={[styles.confirmButton, styles.proceedButton]} onPress={confirmAnswer} disabled={isSpeaking || isRecording}>
            <Text style={styles.buttonText}>Proceed</Text>
          </RNPressable>
          <RNPressable style={[styles.confirmButton, styles.cancelButton]} onPress={cancelAndReanswer} disabled={isSpeaking || isRecording}>
            <Text style={styles.buttonText}>Re-answer</Text>
          </RNPressable>
        </View>
      </View>
    );
  }

  return (
    <RNPressable
      style={{ flex: 1 }}
      accessible={true}
      accessibilityLabel="Onboarding questionnaire"
      onLongPress={startRecording}
      onPressOut={stopRecording}
      // Disable touch events when recording OR speaking is active
      pointerEvents={isRecording || isSpeaking ? 'none' : 'auto'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo} accessible={true} accessibilityRole="header" accessibilityLabel="Visionary Guide Setup">Visionary Guide</Text>
            <Text style={styles.subtitle} accessible={true} accessibilityLabel={`Setting up your preferences. Question ${idx + 1} of ${questions.length}`}>Let's personalize your experience</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer} accessible={true} accessibilityRole="progressbar" accessibilityLabel={`Progress: ${Math.round(progress)}% complete`} accessibilityValue={{ now: progress, min: 0, max: 100 }}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{idx + 1} / {questions.length}</Text>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.questionLabel} accessible={true} accessibilityRole="text">Question {idx + 1}</Text>
            <Text style={styles.questionText} accessible={true} accessibilityRole="text" accessibilityLabel={questions[idx].text}>{questions[idx].text}</Text>
          </View>

          {/* Answer Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel} accessible={true}>Your Answer</Text>
            <TextInput style={styles.input} value={answer} onChangeText={setAnswer} placeholder="Type your answer here..." placeholderTextColor="#999" accessible={true} accessibilityLabel="Answer input field" accessibilityHint="Enter your answer or use voice input below" multiline numberOfLines={3} editable={!isRecording && !isSpeaking} />
          </View>

          {/* Voice Input Indicator */}
          <View
            style={[
              styles.micButton,
              isRecording && styles.micRecording,
              isSpeaking && { opacity: 0.5, backgroundColor: '#666' }
            ]}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={isRecording ? 'Recording in progress' : isSpeaking ? 'System is speaking, recording is paused' : 'Press and hold anywhere on screen to record'}
          >
            <View style={styles.micButtonContent}>
              <View style={styles.micIcon}>
                <Text style={styles.micIconText}>🎤</Text>
              </View>
              <Text style={styles.micText}>
                {isRecording ? 'Recording...' : isSpeaking ? 'System Speaking...' : 'Hold Anywhere to Speak'}
              </Text>
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonRow}>
            <RNPressable
              style={({ pressed }) => [
                styles.nextButton,
                pressed && styles.nextPressed
              ]}
              onPress={saveAndNext}
              disabled={isRecording || isSpeaking || !answer.trim()}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={idx < questions.length - 1 ? 'Next question' : 'Complete setup'}
              accessibilityHint="Saves your answer and continues"
            >
              <Text style={styles.nextText}>
                {idx < questions.length - 1 ? 'Next' : 'Complete'}
              </Text>
            </RNPressable>
          </View>

          {/* Helper Text */}
          <Text
            style={styles.helperText}
            accessible={true}
            accessibilityRole="text"
          >
            💡 Tip: Hold anywhere on the screen to speak your answer
          </Text>
        </View>
      </ScrollView>
    </RNPressable>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#F8F9FA', },
  container: { flex: 1, padding: 20, paddingTop: 60, },
  header: { marginBottom: 20, alignItems: 'center', },
  logo: { fontSize: 32, fontWeight: '800', color: '#1A1A1A', marginBottom: 8, letterSpacing: 0.5, },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', },
  progressContainer: { marginBottom: 8, },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 2, },
  progressFill: { height: '100%', backgroundColor: '#007AFF', borderRadius: 4, },
  progressText: { fontSize: 14, color: '#666', textAlign: 'right', fontWeight: '600', },
  questionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, },
  questionLabel: { fontSize: 16, color: '#007AFF', fontWeight: '700', marginBottom: 2, letterSpacing: 0.5, textTransform: 'uppercase', },
  questionText: { fontSize: 14, color: '#1A1A1A', lineHeight: 28, fontWeight: '600', },
  inputContainer: { marginBottom: 10, },
  inputLabel: { fontSize: 14, color: '#666', fontWeight: '600', marginBottom: 1, },
  input: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E0E0E0', padding: 16, borderRadius: 12, fontSize: 16, minHeight: 80, textAlignVertical: 'top', color: '#1A1A1A', },
  micButton: { backgroundColor: '#FF9500', borderRadius: 16, marginBottom: 16, shadowColor: '#FF9500', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, },
  micPressed: { backgroundColor: '#CC7700', transform: [{ scale: 0.97 }], },
  micRecording: { backgroundColor: '#FF3B30', shadowColor: '#FF3B30', },
  micButtonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, },
  micIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12, },
  micIconText: { fontSize: 20, },
  micText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18, },
  buttonRow: { flexDirection: 'row', marginBottom: 16, },
  nextButton: { flex: 1, backgroundColor: '#34C759', padding: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#34C759', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, },
  nextPressed: { backgroundColor: '#2a9d4f', transform: [{ scale: 0.97 }], },
  nextText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18, },
  helperText: { fontSize: 11, color: '#666', textAlign: 'center', },
  confirmationContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#1C1C1E', },
  confirmationTitle: { fontSize: 26, fontWeight: '900', color: 'white', marginBottom: 30, textAlign: 'center', },
  queryBox: { backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 25, borderRadius: 15, width: '100%', alignItems: 'center', marginBottom: 30, },
  queryText: { fontSize: 22, color: '#007AFF', fontWeight: '600', textAlign: 'center', fontStyle: 'italic', },
  confirmationPrompt: { fontSize: 18, color: '#A0A0A0', marginBottom: 50, fontWeight: '500', textAlign: 'center', },
  buttonContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', },
  confirmButton: { paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12, width: '48%', alignItems: 'center', justifyContent: 'center', },
  proceedButton: { backgroundColor: '#34C759', },
  cancelButton: { backgroundColor: '#FF3B30', },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '700', },
});
