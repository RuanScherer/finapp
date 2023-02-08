import { Flex, Grid, GridItem, Heading, HStack, Tag, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { MonthBalance } from "../../../../features/Home/Dashboard/MonthBalance";
import { boxShadow } from "../../../../theme";

export function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    async function getTotalPendenciesStats() {

    }

    async function getPendenciesStatsByMonth() {

    }

  }, [])

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridAutoFlow="column" gap="4">
      <GridItem>
        <MonthBalance />
      </GridItem>

      <GridItem>
        <Flex
          flexDirection="column"
          alignItems="stretch"
          bgColor="background.100"
          borderRadius="xl"
          boxShadow={boxShadow[100]}
          h="full"
          p="5"
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Heading fontSize="xl" fontWeight="semibold">Pendências</Heading>
            <Text
              fontSize="sm"
              color="primary.500"
              cursor="pointer"
              textAlign="right"
              mt="2"
              _hover={{
                filter: "brightness(0.8)"
              }}
            >
              Ver mais
            </Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" mt="2">
            <HStack alignItems="center">
              <Text color="text.700">Faculdade</Text>
              <Tag
                variant="subtle"
                size="sm"
                bgColor="gray.200"
                borderRadius="full"
              >
                Estudos
              </Tag>
            </HStack>
            
            <Text fontWeight="semibold">
              {new Intl
                .NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(1204.91)
              }
            </Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" mt="2">
            <HStack alignItems="center">
              <Text color="text.700">Finclass</Text>
              <Tag
                variant="subtle"
                size="sm"
                bgColor="gray.200"
                borderRadius="full"
              >
                Estudos
              </Tag>
            </HStack>
            
            <Text fontWeight="semibold">
              {new Intl
                .NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(24.9)
              }
            </Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" mt="2">
            <HStack alignItems="center">
              <Text color="text.700">Carro</Text>
              <Tag
                variant="subtle"
                size="sm"
                bgColor="gray.200"
                borderRadius="full"
              >
                Essencial
              </Tag>
            </HStack>
            
            <Text fontWeight="semibold">
              {new Intl
                .NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                .format(649.8)
              }
            </Text>
          </HStack>
        </Flex>
      </GridItem>
    </Grid>
  )
}
