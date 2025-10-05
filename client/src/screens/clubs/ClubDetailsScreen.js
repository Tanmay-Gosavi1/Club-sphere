import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';

import useAuthStore from '../../stores/authStore';
import useClubStore from '../../stores/clubStore';
import { colors, spacing, typography } from '../../utils/theme';

const ClubDetailsScreen = ({ route, navigation }) => {
  const { club } = route.params;
  const [activeTab, setActiveTab] = useState('about');
  const [requestMessage, setRequestMessage] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  const { token, user } = useAuthStore();
  const { requestMembership, loading } = useClubStore();

  const isUserMember = () => {
    return user?.club?.includes(club._id) || false;
  };

  const handleRequestMembership = async () => {
    try {
      const result = await requestMembership(club._id, token, requestMessage);
      
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Request Sent!',
          text2: 'Your membership request has been submitted for approval.',
        });
        setShowRequestModal(false);
        setRequestMessage('');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Request Failed',
          text2: result.error || 'Failed to send membership request',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection',
      });
    }
  };

  const renderTabButton = (tabName, label, icon) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tabName && styles.activeTabButton]}
      onPress={() => setActiveTab(tabName)}
    >
      <Ionicons 
        name={icon} 
        size={20} 
        color={activeTab === tabName ? colors.primary : colors.textSecondary} 
      />
      <Text style={[
        styles.tabText,
        activeTab === tabName && styles.activeTabText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderAboutTab = () => (
    <Animatable.View animation="fadeIn" style={styles.tabContent}>
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          {club.clubDescription || 'No description available for this club.'}
        </Text>
      </View>
      
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {club.members?.length || 0} members
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {club.location || 'Location not specified'}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {club.category || 'General'}
          </Text>
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <LinearGradient
            colors={colors.gradient.primary}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.clubIconLarge}>
                <Ionicons name="people" size={32} color={colors.background} />
              </View>
              <Text style={styles.clubTitle}>{club.clubName}</Text>
              <Text style={styles.clubSubtitle}>
                {club.members?.length || 0} members • {club.category || 'General'}
              </Text>
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Join/Joined Status */}
        <Animatable.View animation="fadeIn" delay={300} style={styles.statusContainer}>
          {isUserMember() ? (
            <View style={styles.memberBadge}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.memberText}>You are a member</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={() => setShowRequestModal(true)}
            >
              <LinearGradient
                colors={colors.gradient.secondary}
                style={styles.joinButtonGradient}
              >
                <Ionicons name="person-add" size={20} color={colors.background} />
                <Text style={styles.joinButtonText}>Request to Join</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </Animatable.View>

        {/* Tabs */}
        <Animatable.View animation="fadeIn" delay={500} style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {renderTabButton('about', 'About', 'information-circle-outline')}
          </View>
        </Animatable.View>

        {/* Tab Content */}
        {activeTab === 'about' && renderAboutTab()}
      </ScrollView>

      {/* Membership Request Modal */}
      <Modal
        visible={showRequestModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRequestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Request to Join Club</Text>
            <Text style={styles.modalSubtitle}>
              Send a message to the club administrators
            </Text>
            
            <TextInput
              style={styles.messageInput}
              placeholder="Why do you want to join this club? (Optional)"
              placeholderTextColor={colors.textSecondary}
              value={requestMessage}
              onChangeText={setRequestMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowRequestModal(false);
                  setRequestMessage('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleRequestMembership}
                disabled={loading}
              >
                <LinearGradient
                  colors={colors.gradient.primary}
                  style={styles.sendButtonGradient}
                >
                  <Text style={styles.sendButtonText}>
                    {loading ? 'Sending...' : 'Send Request'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerGradient: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  clubIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  clubTitle: {
    ...typography.h1,
    color: colors.background,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  clubSubtitle: {
    ...typography.body,
    color: colors.background,
    opacity: 0.9,
    textAlign: 'center',
  },
  statusContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success + '15',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  memberText: {
    ...typography.body,
    color: colors.success,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  joinButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  joinButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: spacing.xs,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  aboutSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  createEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  createEventText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  eventCard: {
    marginBottom: spacing.md,
  },
  eventContent: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventGradient: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  eventTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },
  eventDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  eventDetails: {
    marginBottom: spacing.sm,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  eventDetailText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeeCount: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyEvents: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyEventsTitle: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyEventsText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  modalSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.textSecondary,
  },
  sendButton: {
    flex: 1,
  },
  sendButtonGradient: {
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    ...typography.button,
    color: colors.background,
  },
});

export default ClubDetailsScreen;