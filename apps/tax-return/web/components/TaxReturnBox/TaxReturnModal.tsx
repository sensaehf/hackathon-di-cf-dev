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

interface Modal {
  isVisible: boolean
  onClose: () => void
}

export const TaxReturnModal: React.FC<Modal> = ({ isVisible, onClose }) => {
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
            <Button colorScheme="negative" circle={true} onClick={onClose}>
              <Icon icon="close" color={'dark400'}></Icon>
            </Button>
          </Box>
          <Box paddingX={10} paddingTop={5} paddingBottom={10}>
            <Text variant="h1" as={'h1'} marginBottom={2}>
              Salary and Work-Related Payments
            </Text>
            <Text marginBottom={5}>
              If the number shown doesn’t match your payslips or income
              statements, you can adjust it. Make sure to enter the correct
              total before tax, based on what you earned during the year.
            </Text>
            <Box
              marginBottom={4}
              display="flex"
              justifyContent={'spaceBetween'}
              alignItems={'center'}
            >
              <Box width="full">
                <Input
                  label={'Norðurljós Software ehf'}
                  value={9360000}
                  name={''}
                />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'flexStart'}
                paddingRight={10}
                paddingLeft={3}
              >
                <Tooltip text={'Delete'}>
                  <Button circle={true} colorScheme="light">
                    <Icon icon="trash" type="outline" />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
            <Box
              marginBottom={4}
              display="flex"
              justifyContent={'spaceBetween'}
              alignItems={'center'}
            >
              <Box width="full">
                <Input
                  label={'Norðurljós Software ehf'}
                  value={9360000}
                  name={''}
                />
              </Box>
              <Box
                display={'flex'}
                justifyContent={'flexStart'}
                paddingRight={10}
                paddingLeft={3}
              >
                <Button circle={true} colorScheme="light">
                  <Icon icon="trash" type="outline" />
                </Button>
              </Box>
            </Box>
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
