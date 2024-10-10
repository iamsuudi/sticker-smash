import { Image } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
    imgSource: string;
    selectedImage?: string;
};

const ImageViewer = ({ imgSource, selectedImage }: Props) => {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    return <Image source={imageSource} style={styles.image} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 500,
        borderRadius: 18,
    },
});
