import SearchIcon from '@mui/icons-material/Search'
import { TextField, InputAdornment, Box } from '@mui/material'

function SearchBar() {
  return (
    <Box my={2}>
      <TextField
        id='input-with-icon-textfield'
        label='ค้นหาตามชื่อร้าน'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        sx={{ background: 'white' }}
        fullWidth
        size='small'
      />
    </Box>
  )
}

export default SearchBar
