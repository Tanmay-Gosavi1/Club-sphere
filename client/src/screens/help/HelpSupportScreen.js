import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { colors } from '../../utils/theme';

const HelpSupportScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>About ClubSphere</Text>
        <Text style={styles.description}>
          ClubSphere is your all-in-one platform for discovering and engaging with college clubs and events. 
          We make it easy to stay connected with campus life and never miss out on exciting opportunities.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What You Can Do</Text>
        <View style={styles.featureList}>
          <Text style={styles.feature}>• Find and join clubs that match your interests</Text>
          <Text style={styles.feature}>• Stay updated with upcoming events</Text>
          <Text style={styles.feature}>• Create and manage your own clubs</Text>
          <Text style={styles.feature}>• Connect with fellow students</Text>
          <Text style={styles.feature}>• Track your club memberships</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <Text style={styles.text}>
          1. Browse clubs in the Clubs tab{'\n'}
          2. View club details and upcoming events{'\n'}
          3. Send membership requests to join clubs{'\n'}
          4. Create your own club (if eligible){'\n'}
          5. Manage your profile and preferences
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <Text style={styles.text}>
          If you're experiencing any issues or have questions, our support team is here to help.
        </Text>
        <Text style={styles.contactInfo}>Contact us at: support@clubsphere.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.versionInfo}>ClubSphere v1.0.0</Text>
        <Text style={styles.copyright}>© 2025 ClubSphere. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  featureList: {
    marginTop: 8,
  },
  feature: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 28,
    paddingLeft: 8,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  contactInfo: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 12,
  },
  versionInfo: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default HelpSupportScreen;