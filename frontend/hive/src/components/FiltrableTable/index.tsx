import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import './index.css';

const filters = ['ALL CATEGORIES', 'TRANSPORT', 'HEALTH', 'EDUCATION', 'IT', 'AGRICULTURE'];
const tableHeaders = ['Rank', '', 'Company', 'Score']

class FiltrableTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        
    }

    render() {
        const filtersToDisplay = filters?.map((filter: string, index: number) => {
            return (
                <div className="filter" key={`filter-key-${index}`}>
                    {filter}
                </div>
            )
        });

        return (
            <div>
                <div className="filters">
                    {filtersToDisplay}
                </div>

                <TableContainer component={Paper} className="filters-table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            {tableHeaders?.map((header: string) => (
                                <TableCell align="left" key={header}>{header}</TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.rows?.map((row: any) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {Object.keys(row)?.map?.((rowField: string, index: number) => (
                                        <TableCell component="th" scope="row" key={`key-${rowField}-${index}`}>
                                            {(row as any)[rowField]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default FiltrableTable;