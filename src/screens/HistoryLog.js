import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HistoryLog({ navigation }) {

    const data = [
        { id: "1", date: "Friday, November 21, 2025", calories: "2800/3000 kcal" },
        { id: "2", date: "Saturday, November 22, 2025", calories: "3000/3000 kcal" },
        { id: "3", date: "Sunday, November 23, 2025", calories: "3000/3000 kcal" },
        { id: "4", date: "Monday, November 24, 2025", calories: "2800/3000 kcal" },
        { id: "5", date: "Tuesday, November 25, 2025", calories: "2300/3000 kcal" },
        { id: "6", date: "Wednesday, November 26, 2025", calories: "3000/3000 kcal" },
        { id: "7", date: "Thursday, November 27, 2025", calories: "3500/3000 kcal" },
        { id: "8", date: "Friday, November 28, 2025", calories: "2800/3000 kcal" },
        { id: "9", date: "Saturday, November 29, 2025", calories: "3000/3000 kcal" },
    ];

    function renderItem({ item }) {
        return (
            <View style={styles.card}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.kcalText}>{item.calories}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 24, paddingBottom: 40, }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FCFDF7",
        overflow: "visible",
    },

    card: {
        backgroundColor: "#FCFDF7",
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 22,
        marginBottom: 16,

        //shadow
        shadowColor: "#7E7E7E",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,


    },

    dateText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 6,
    },

    kcalText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4A4A4A",
    },
});
