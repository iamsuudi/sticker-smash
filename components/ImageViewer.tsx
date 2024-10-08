import { Image } from "expo-image";
import { StyleSheet, } from "react-native";

type Props = {
    imgSource: string;
};

const ImageViewer = ({ imgSource }: Props) => {
    return <Image source={imgSource} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
