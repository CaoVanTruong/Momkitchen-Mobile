import { Text } from '@rneui/themed';
import {
  Colors,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  Dimensions,
} from 'constants';
import shadowStyle from 'constants/shadowStyle';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ISession } from 'types/session';

interface MarketItemProps extends ISession {
  onPress?: () => void;
}

const MarketItem = ({
  title,
  createdDate,
  startTime,
  endTime,
  onPress,
}: MarketItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.actionContainer}>
        <View style={styles.marketItemContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>{title || 'No Title'}</Text>
            <Text style={styles.createdDate}>
              Created Date: {dayjs(createdDate).format(DEFAULT_DATE_FORMAT)}
            </Text>
            <Text style={styles.timeline}>
              {`Timeline: ${dayjs(startTime).format(
                DEFAULT_TIME_FORMAT,
              )} - ${dayjs(endTime).format(DEFAULT_TIME_FORMAT)}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MarketItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginBottom: 12,
    borderRadius: Dimensions.RADIUS_2,
    ...shadowStyle.ELEVATOR_4,
  },
  actionContainer: {
    borderRadius: Dimensions.RADIUS_2,
  },
  marketItemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: Dimensions.RADIUS_2,
  },
  imgWrapper: {
    alignSelf: 'center',
    width: 64,
    height: 64,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.orange,
    marginBottom: 4,
    fontWeight: '500',
  },
  createdDate: {},
  timeline: {
    textAlign: 'right',
  },
});
