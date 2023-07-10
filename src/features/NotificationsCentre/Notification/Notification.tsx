import {
  Box,
  HStack,
  IconButton,
  ListItem,
  Text,
  theme,
} from "@chakra-ui/react";
import { Card } from "@components/Card";
import { RxCheck, RxClock } from "react-icons/rx";
import { NotificationProps } from "./";

function getIconByCategory(category: string) {
  const iconByCategory = {
    EXPIRING_FIXED_TRANSACTION: (
      <RxClock size={20} stroke={theme.colors.gray[400]} strokeWidth={0.5} />
    ),
  };

  return iconByCategory[category as keyof typeof iconByCategory] || null;
}

export function Notification(props: NotificationProps) {
  return (
    <Card p={4}>
      <ListItem cursor="default">
        <HStack spacing={3} alignItems="flex-start">
          <Box bgColor="blackAlpha.50" borderRadius="full" p={2}>
            {getIconByCategory(props.notification.category)}
          </Box>

          <Box>
            <Text fontWeight="medium" lineHeight="short" mb={1}>
              {!props.notification.read && (
                <Text as="span" fontWeight="bold" color="primary.500" mr={1}>
                  •
                </Text>
              )}
              {props.notification.title}
            </Text>

            <Text fontSize="sm" lineHeight="shorter" color="gray.500">
              {props.notification.content}
            </Text>

            <HStack justify="space-between" mt={2}>
              <Text
                fontSize="xs"
                fontWeight="light"
                lineHeight="none"
                color="gray.500"
              >
                {new Intl.DateTimeFormat("pt-BR").format(
                  props.notification.createdAt
                )}
              </Text>

              <IconButton
                size="xs"
                variant="ghost"
                colorScheme="primary"
                aria-label="Marcar como lida"
                title="Marcar como lida"
                icon={
                  <RxCheck
                    size={18}
                    stroke={theme.colors.gray[400]}
                    strokeWidth={0.5}
                  />
                }
                onClick={() => props.onRead?.(props.notification)}
              />
            </HStack>
          </Box>
        </HStack>
      </ListItem>
    </Card>
  );
}
