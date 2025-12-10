import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';


export const AppStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        padding: 16,
    },
    backgroundOverlay: {
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',  
      height: '100%',
    },
    header: {
        height: 220,
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 16,
        overflow: 'hidden',
        width: '100%',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },

    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: '#ccc',
        lineHeight: 22,
    },
    bodyText: {
        fontSize: 15,
        color: "#111",
        lineHeight: 22,
        marginBottom: 20,
    },
    introContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },


})