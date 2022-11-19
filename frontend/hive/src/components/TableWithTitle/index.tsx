import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import './index.css';

class TableWithTitle extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="table-with-title">
                <div className="table-with-title-header">
                    <h1>{this.props.title}</h1>
                    {this.props.moreLink && <Link href={this.props.moreLink}>See More</Link>}
                </div>
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            {this.props.tableHeaders.map((header: string) => (
                                <TableCell align="left">{header}</TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.rows.map((row: any) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {Object.keys(row).map((rowField: string) => (
                                        <TableCell component="th" scope="row">
                                            {(row as any)[rowField]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default TableWithTitle;