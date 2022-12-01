import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'

export default function MapTable(props) {
    const { head, body } = props
    return <TableContainer component={Paper}>
        <Table sx={{ wordWrap: 'break-word', width: '100%' }} size='small' aria-label='info'>
            <TableHead>
                {head}
            </TableHead>
            <TableBody>
                {body}
            </TableBody>
        </Table>
    </TableContainer>
}