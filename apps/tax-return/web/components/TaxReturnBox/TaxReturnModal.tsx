import {
  Box,
  Button,
  Divider,
  Icon,
  Input,
  ModalBase,
  Text,
  Tooltip,
} from '@island.is/island-ui/core'
import { Icon as IconType } from 'libs/island-ui/core/src/lib/IconRC/iconMap'

interface Modal {
  isVisible: boolean
  onClose: () => void
  data: SubCategory[]
  title: string
  description: string
}

interface TaxReturnBoxProps {
  title: string
  icon: IconType
  subCategories: SubCategory[]
  total: number
}

interface SubCategory {
  title?: string
  values: Values[]
}

interface Values {
  label: string
  value: number
}

export const TaxReturnModal: React.FC<Modal> = ({
  isVisible,
  onClose,
  data,
  title,
  description,
}) => {
  return (
    <ModalBase baseId={'dialog'} isVisible={isVisible}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box background="white" width={'half'}>
          <Box
            display="flex"
            width="full"
            justifyContent={'flexEnd'}
            padding={3}
          >
            <Button
              colorScheme="negative"
              circle={true}
              onClick={onClose}
              title="close"
            >
              <Icon icon="close" color={'dark400'} />
            </Button>
          </Box>
          <Box paddingX={10} paddingTop={5} paddingBottom={10}>
            <Text variant="h1" as={'h1'} marginBottom={2}>
              {title}
            </Text>
            <Text marginBottom={5}>{description}</Text>

            {data.map((category, index) => (
              <>
                {category.title && (
                  <Box marginBottom={2}>
                    <Text variant="h5" as={'h4'}>
                      {category.title}
                    </Text>
                  </Box>
                )}
                <Box marginBottom={4}>
                  {category.values.map((item, i) => {
                    return (
                      <Box
                        display="flex"
                        justifyContent={'spaceBetween'}
                        alignItems={'center'}
                        marginBottom={4}
                      >
                        <Box width="full">
                          <Input
                            label={item.label}
                            name={item.label}
                            value={item.value}
                            type="number"
                          />
                        </Box>
                        <Box
                          display={'flex'}
                          justifyContent={'flexStart'}
                          paddingRight={10}
                          paddingLeft={3}
                        >
                          <Button
                            circle={true}
                            colorScheme="light"
                            title="delete"
                          >
                            <Icon icon="trash" type="outline" />
                          </Button>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </>
            ))}
            <Box marginBottom={8}>
              <Box marginBottom={4}>
                <Button variant="ghost" icon="add">
                  Add other information
                </Button>
              </Box>
              <Divider />
            </Box>
            <Box display="flex" justifyContent={'spaceBetween'} marginTop={5}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary">Confirm</Button>
            </Box>
          </Box>
        </Box>
      </div>
    </ModalBase>
  )
}
