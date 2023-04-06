import { Table, TableBody, TableCell, TableHead, TableRow } from "@aws-amplify/ui-react";

export function Checklist() {
    return (
        <div className="page-content">
            <Table
                highlightOnHover={true}
                variation="striped"
            >
                <TableHead>
                    <TableRow>
                        <TableCell as="th">Techniques</TableCell>
                        <TableCell as="th">Locations</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Database Usage</TableCell>
                        <TableCell>Pet Page</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Ajax Usage</TableCell>
                        <TableCell>Pet Page</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>New Library Usage</TableCell>
                        <TableCell>Pet Page</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>JavaScript Usage</TableCell>
                        <TableCell>Entire Site</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Membership Area</TableCell>
                        <TableCell>Pet Page</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}