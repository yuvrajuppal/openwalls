import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const C = {
  primary: '#000000',
  secondary: '#555555',
  outlineVariant: '#cfc4c5',
  background: '#f9f9f9',
  surfaceContainer: '#eeeeee',
  surfaceContainerHigh: '#e8e8e8',
}

const DEMO = [
  { id: '1qg87w', category: 'general', resolution: '1920x1080', thumbs: 'https://picsum.photos/seed/wp1/400/500' },
  { id: '2m9k3z', category: 'anime', resolution: '2560x1440', thumbs: 'https://picsum.photos/seed/wp2/400/500' },
  { id: '3x7p1a', category: 'general', resolution: '3840x2160', thumbs: 'https://picsum.photos/seed/wp3/400/500' },
  { id: '4b6t2c', category: 'anime', resolution: '1920x1200', thumbs: 'https://picsum.photos/seed/wp4/400/500' },
  { id: '5h8d9f', category: 'general', resolution: '2560x1600', thumbs: 'https://picsum.photos/seed/wp5/400/500' },
  { id: '6k1l4s', category: 'anime', resolution: '3840x2160', thumbs: 'https://picsum.photos/seed/wp6/400/500' },
]

export default function Homepage() {
  const [loading, setLoading] = useState(false)

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.discoverLabel}>Discover</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Random Wallpapers</Text>
            <TouchableOpacity
              onPress={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 600)
              }}
              style={styles.refreshButton}
              activeOpacity={0.6}
            >
              <MaterialCommunityIcons
                name="sync"
                size={16}
                color={C.primary}
                style={loading ? styles.spinning : undefined}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.viewAllText}>View All</Text>
          <MaterialCommunityIcons name="arrow-right" size={14} color={C.secondary} />
        </View>
      </View>

      <View style={styles.divider} />

      {loading ? (
        <View style={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />
              <View style={styles.skeletonBar} />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={DEMO}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.8}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.thumbs }} style={styles.image} />
              </View>
              <View style={styles.overlay}>
                <Text style={styles.categoryBadge}>{item.category}</Text>
                <View style={styles.overlayBottom}>
                  <Text style={styles.resolutionText}>{item.resolution}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  discoverLabel: {
    fontSize: 12,
    letterSpacing: 2.4,
    fontWeight: '500',
    color: C.secondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.4,
    fontWeight: '700',
    color: C.primary,
    textTransform: 'uppercase',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinning: {
    transform: [{ rotate: '45deg' }],
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 4,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '500',
    color: C.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: C.outlineVariant,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skeletonCard: {
    width: '48%',
    marginBottom: 12,
  },
  skeletonImage: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: C.surfaceContainerHigh,
  },
  skeletonBar: {
    width: '60%',
    height: 10,
    backgroundColor: C.surfaceContainerHigh,
    marginTop: 8,
    borderRadius: 2,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    position: 'relative',
  },
  imageWrapper: {
    backgroundColor: C.surfaceContainer,
    aspectRatio: 4 / 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    overflow: 'hidden',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  overlayBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 10,
  },
  resolutionText: {
    fontSize: 10,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})
