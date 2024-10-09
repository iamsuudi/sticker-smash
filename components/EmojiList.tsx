import { Image } from "expo-image";
import { useState } from "react";
import {
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

type Props = {
    onSelect: (image: string) => void;
    onCloseModal: () => void;
};

const EmojiList = ({ onSelect, onCloseModal }: Props) => {
    const [emoji] = useState([
        require("../assets/images/emoji1.png"),
        require("../assets/images/emoji2.png"),
        require("../assets/images/emoji3.png"),
        require("../assets/images/emoji4.png"),
        require("../assets/images/emoji5.png"),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === "web"}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item);
                        onCloseModal();
                    }}
                >
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}
        >
            <Text>EmojiList</Text>
        </FlatList>
    );
};

export default EmojiList;

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});
