import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

export default function MapTable (props) {
  const { tableData } = props
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell colSpan='2'>{tableData.title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.data.map((row, idx) => (
            <TableRow key={`tr_${idx}`}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
