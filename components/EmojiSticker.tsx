import { Image } from "expo-image";
import { View } from "react-native";

type Props = {
    imageSize: number;
    stickerSource: string;
};

const EmojiSticker = ({ imageSize, stickerSource }: Props) => {
    return (
        <View style={{ top: -350 }}>
            <Image
                source={stickerSource}
                style={{ width: imageSize, height: imageSize }}
            />
        </View>
    );
};

export default EmojiSticker;
