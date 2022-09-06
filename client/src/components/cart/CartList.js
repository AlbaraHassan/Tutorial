import React, {memo} from 'react'
import {
    Button, ButtonGroup,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from '@mui/material'
import {Stack, styled} from "@mui/system"

const Item = styled(Paper)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}))

const CartList = ({cart, counter, cartAddHandler, cartSubtractHandler}) => {


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Subcategory</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart !== [] ? cart.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant={"h5"}>
                                        {row.category_id.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant={"h5"}>
                                        {row.subcategory_id.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant={"h5"}>
                                        {row.price}$
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">{
                                    counter.map((e) => {
                                        if (e.id === row._id) return <div key={row._id}>
                                            <Stack spacing={2} direction={"row"} component={"div"}>
                                                <Item>
                                                    <Typography variant={"h3"}>
                                                        {e.price / row.price}
                                                    </Typography>
                                                </Item>
                                                <Item>

                                                    <ButtonGroup
                                                        orientation="vertical"
                                                        aria-label="vertical outlined button group"
                                                    >
                                                        <Button size="small" variant="outlined" onClick={() => {
                                                            cartAddHandler([row._id, row.price])
                                                        }}>⬆</Button>

                                                        <Button size="small" variant="outlined" onClick={() => {
                                                            cartSubtractHandler([row._id, row.price], row._id)
                                                        }}>⬇</Button>

                                                    </ButtonGroup>
                                                </Item>
                                            </Stack>
                                        </div>
                                    })
                                }</TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
};

export default memo(CartList);