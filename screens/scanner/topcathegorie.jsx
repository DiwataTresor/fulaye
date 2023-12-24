import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';

export default function Example() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E7E4E4' }}>
      <View style={styles.container}>
        <Text style={styles.title} className="-top-4">Parcourez toutes les catégories</Text>

        <View style={styles.stats}>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <Ionicons name="videocam-outline" size={22} color="#fc2222" />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Fulaye</Text>

                <Text style={styles.statsItemValue}>832</Text>
              </View>
            </View>

            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="grid" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Video</Text>

                <Text style={styles.statsItemValue}>8</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="archive" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Shop</Text>

                <Text style={styles.statsItemValue}>22</Text>
              </View>
            </View>

            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="columns" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Food</Text>

                <Text style={styles.statsItemValue}>48</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="list" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>High-Tech</Text>

                <Text style={styles.statsItemValue}>83</Text>
              </View>
            </View>
            
          </View>
          
        </View>
      </View>
      
      <View style={styles.container}>
        <View style={styles.stats}>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <Ionicons name="videocam-outline" size={22} color="#fc2222" />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Habillement</Text>

                <Text style={styles.statsItemValue}>832</Text>
              </View>
            </View>

            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="grid" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Immobilier</Text>

                <Text style={styles.statsItemValue}>8</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="archive" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Culture&Loisirs</Text>

                <Text style={styles.statsItemValue}>22</Text>
              </View>
            </View>

            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="columns" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Resto</Text>

                <Text style={styles.statsItemValue}>48</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fc2222" name="list" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Coiffure et maquillage</Text>

                <Text style={styles.statsItemValue}>83</Text>
              </View>
            </View>
            
          </View>
          
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '200',
    color: '#373F51',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  statsItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff', 
    marginHorizontal: 6,
    marginBottom: 12,
  },
  statsItemIcon: {
    backgroundColor: '#E1DEE3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    marginRight: 8,
    borderRadius: 8,
  },
  statsItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8e8e93',
    marginBottom: 2,
  },
  statsItemValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#081730',
  },
});