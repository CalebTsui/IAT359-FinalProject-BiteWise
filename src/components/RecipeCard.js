import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { recipeList } from "../../Constant";

const RecipeCard = () => {
    return(
        <View>
            <FlatList style={styles.container}
                data={recipeList} 
                renderItem={({item})=> (
                <View style={styles.cardContainer}>
                    <Image style={styles.cardImage} source={item.image}/>
                    <Text style={styles.recipeName}>{item.name}</Text>
                    <Text style={styles.recipeCalories}>{item.calories}</Text>
                </View>)}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between"
                }}

                showsVerticalScrollIndicator={false}
                
                />
        </View>
        
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    container:{
        // paddingBottom: 50,
        // paddingHorizontal: 4, 
    },

    cardContainer:{
        // width: "48%",
        backgroundColor: "#FCFDF7",
        borderRadius: 20,
        // marginVertical: 18,
        marginBottom: 18,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 16,

         // shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 3, // Android
    },

    cardImage:{
        width: 144,
        height: 144,
        borderRadius: 12,
        marginBottom: 12,
        // resizeMode: "center"
    },

    recipeName:{
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 8,
    },

    recipeCalories:{
        fontSize: 14,
        fontWeight: 400,
        color: "#887B7B",
    },

});