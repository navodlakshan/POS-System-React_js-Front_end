"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead, Modal, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

interface Refund {
    id: number;
    name: string;
    date: string;
    status: string;
    probability: string;
    customer: string;
    notes: string;
}

const refunds: Refund[] = [
    {
        id: 1,
        name: "Leptep (F)",
        date: "2020",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 2,
        name: "Leptep (F)",
        date: "2021",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 3,
        name: "Leptep (F)",
        date: "2022",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 4,
        name: "Leptep (F)",
        date: "2023",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 5,
        name: "Leptep (F)",
        date: "2024",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 6,
        name: "Leptep (F)",
        date: "2025",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 7,
        name: "Leptep (F)",
        date: "2026",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
    {
        id: 8,
        name: "Leptep (F)",
        date: "2027",
        status: "31.05/06",
        probability: "2024/07/14",
        customer: "Production Issues",
        notes: "Powers | Wired | Successful",
    },
];

export default function ViewRefund() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editRefund, setEditRefund] = useState<Refund | null>(null);
    const [deleteRefund, setDeleteRefund] = useState<Refund | null>(null);
    const [refundsState, setRefundsState] = useState(refunds);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (refund: Refund) => {
        setEditRefund(refund);
    };

    const handleDelete = (refund: Refund) => {
        setDeleteRefund(refund);
    };

    const handleSave = () => {
        if (editRefund) {
            const updatedRefunds = refundsState.map((r) =>
                r.id === editRefund.id ? editRefund : r
            );
            setRefundsState(updatedRefunds);
            setEditRefund(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteRefund) {
            const updatedRefunds = refundsState.filter((r) => r.id !== deleteRefund.id);
            setRefundsState(updatedRefunds);
            setDeleteRefund(null);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
        setSortOrder(event.target.value as "asc" | "desc");
    };

    const filteredRefunds = refundsState.filter((refund) =>
        refund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refund.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        refund.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedRefunds = filteredRefunds.sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "date") {
            return sortOrder === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
        } else if (sortBy === "status") {
            return sortOrder === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRefunds.length) : 0;

    // Calculate the range of entries being shown
    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedRefunds.length);
    const totalEntries = sortedRefunds.length;

    return (
        <div className="flex min-h-screen">
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                <Header onMenuClick={toggleSidebar} />
                <div className="p-4">
                    <div className="flex items-center justify-between text-gray-500">
                        <h2 className="text-2xl font-bold mb-4">Refund</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">All Products</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search refunds..."
                                variant="outlined"
                                size="small"
                                value={searchQuery}
                                onChange={handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <div className="flex gap-4">
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="date">Date</MenuItem>
                                        <MenuItem value="status">Status</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Order</InputLabel>
                                    <Select
                                        value={sortOrder}
                                        onChange={handleSortOrderChange}
                                        label="Order"
                                    >
                                        <MenuItem value="asc">Ascending</MenuItem>
                                        <MenuItem value="desc">Descending</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Probability</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedRefunds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedRefunds
                                    ).map((refund, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{refund.name}</TableCell>
                                            <TableCell>{refund.date}</TableCell>
                                            <TableCell>{refund.status}</TableCell>
                                            <TableCell>{refund.probability}</TableCell>
                                            <TableCell>{refund.customer}</TableCell>
                                            <TableCell>{refund.notes}</TableCell>
                                            <TableCell>
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                    onClick={() => handleEdit(refund)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleDelete(refund)}
                                                >
                                                    Delete
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={7} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ borderBottom: "none" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <TablePagination
                                                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                        colSpan={7}
                                                        count={sortedRefunds.length}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        slotProps={{
                                                            select: {
                                                                inputProps: {
                                                                    "aria-label": "rows per page",
                                                                },
                                                                native: true,
                                                            },
                                                        }}
                                                        onPageChange={handleChangePage}
                                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                                        ActionsComponent={TablePaginationActions}
                                                    />
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <Modal open={!!editRefund} onClose={() => setEditRefund(null)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, backgroundColor: "background.paper", boxShadow: 24, p: 4 }}>
                    <h2 className="text-xl font-bold mb-4">Edit Refund</h2>
                    <TextField
                        label="Name"
                        value={editRefund?.name || ""}
                        onChange={(e) => setEditRefund({ ...editRefund!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date"
                        value={editRefund?.date || ""}
                        onChange={(e) => setEditRefund({ ...editRefund!, date: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Status"
                        value={editRefund?.status || ""}
                        onChange={(e) => setEditRefund({ ...editRefund!, status: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Probability"
                        value={editRefund?.probability || ""}
                        onChange={(e) => setEditRefund({ ...editRefund!, probability: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Customer"
                        value={editRefund?.customer || ""}
                        onChange={(e) => setEditRefund({ ...editRefund!, customer: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Notes"
                        value={editRefund?.notes || ""}
                        onChange={(e) => setEditRefund({ ...editRefund!, notes: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteRefund} onClose={() => setDeleteRefund(null)}>
                <DialogTitle>Delete Refund</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the refund for &quot;{deleteRefund?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteRefund(null)}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}