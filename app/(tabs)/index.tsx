import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { Platform, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const placeHolderImage = require("../../assets/images/background-image.png");

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pickedEmoji, setPickedEmoji] = useState<string | undefined>();
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const imageRef = useRef(null);

    if (status == null) {
        requestPermission();
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert("You didn't select any image.");
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
        setPickedEmoji(undefined);
    };

    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const onSaveImageAsync = async () => {
        if (Platform.OS === "web" && imageRef.current) {
            try {
                const dataUrl = await domtoimage.toJpeg(imageRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 500,
                });

                let link = document.createElement("a");
                link.download = "sticker-smash.jpeg";
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const localUri = await captureRef(imageRef, {
                    height: 500,
                    quality: 1,
                });

                await MediaLibrary.saveToLibraryAsync(localUri);

                if (localUri) {
                    alert("Saved!");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View ref={imageRef} collapsable={false}>
                        <ImageViewer
                            imgSource={placeHolderImage}
                            selectedImage={selectedImage}
                        />
                        {pickedEmoji && (
                            <EmojiSticker
                                stickerSource={pickedEmoji}
                                imageSize={40}
                            />
                        )}
                    </View>
                </View>
                {showAppOptions ? (
                    <View style={styles.optionsContainer}>
                        <View style={styles.optionsRow}>
                            <IconButton
                                icon="refresh"
                                label="Reset"
                                onPress={onReset}
                            />
                            <CircleButton onPress={onAddSticker} />
                            <IconButton
                                icon="save-alt"
                                label="Save"
                                onPress={onSaveImageAsync}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.footerContainer}>
                        <Button
                            label="Choose a photo"
                            theme="primary"
                            onPress={pickImageAsync}
                        />
                        <Button
                            label="Use this photo"
                            onPress={() => setShowAppOptions(true)}
                        />
                    </View>
                )}
                <EmojiPicker isvisible={isModalVisible} onClose={onModalClose}>
                    <EmojiList
                        onSelect={setPickedEmoji}
                        onCloseModal={onModalClose}
                    />
                </EmojiPicker>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "space-between",
    },
    imageContainer: {
        flex: 3,
        paddingVertical: 40,
    },
    footerContainer: {
        flex: 1,
        justifyContent: "center",
    },
    optionsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    optionsRow: {
        alignItems: "center",
        flexDirection: "row",
    },
});
