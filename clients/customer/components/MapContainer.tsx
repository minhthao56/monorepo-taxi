import React, { PropsWithChildren } from "react";
import MapView, { PROVIDER_GOOGLE, MapViewProps } from "react-native-maps";
import { Button, YStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { router } from "expo-router";

interface MapContainerProps extends Omit<MapViewProps, "provider" | "style"> {
  renderBottom?: () => React.ReactNode;
}

export default function MapContainer({
  children,
  renderBottom,
  ...props
}: PropsWithChildren<MapContainerProps>) {
  const insets = useSafeAreaInsets();

  return (
    <YStack flex={1}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        {...props}
      >
        {children}
      </MapView>
      <Button
        onPress={() => {
          router.back();
        }}
        style={{
          marginTop: insets.top,
          position: "absolute",
        }}
        borderRadius="$10"
        w="$4"
        ml="$2"
        icon={ArrowLeft}
      />
      {renderBottom && renderBottom()}
    </YStack>
  );
}