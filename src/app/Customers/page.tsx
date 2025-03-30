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
import {
    TableHead,
    Modal,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Typography,
    Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";

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

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    joinDate: string;
    lastPurchase: string;
    totalSpent: string;
}

interface NewCustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    joinDate: string;
    lastPurchase: string;
    totalSpent: string;
}

const initialCustomers: Customer[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "555-123-4567",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        joinDate: "2023/01/15",
        lastPurchase: "2024/03/10",
        totalSpent: "Rs.45,000"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "555-987-6543",
        address: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        joinDate: "2022/11/20",
        lastPurchase: "2024/02/28",
        totalSpent: "Rs.32,500"
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        phone: "555-456-7890",
        address: "789 Pine Rd",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        joinDate: "2023/05/10",
        lastPurchase: "2024/03/05",
        totalSpent: "Rs.28,750"
    }
];

export default function CustomersPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [customersState, setCustomersState] = useState<Customer[]>(initialCustomers);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
    const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
    const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState<NewCustomer>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        joinDate: "",
        lastPurchase: "",
        totalSpent: "Rs.0"
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [darkMode, setDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (customer: Customer) => {
        setEditCustomer(customer);
    };

    const handleDelete = (customer: Customer) => {
        setDeleteCustomer(customer);
    };

    const handleSave = () => {
        if (editCustomer) {
            const updatedCustomers = customersState.map((c) =>
                c.id === editCustomer.id ? editCustomer : c
            );
            setCustomersState(updatedCustomers);
            setEditCustomer(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteCustomer) {
            const updatedCustomers = customersState.filter((c) => c.id !== deleteCustomer.id);
            setCustomersState(updatedCustomers);
            setDeleteCustomer(null);
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newCustomer.name) newErrors.name = "Name is required";
        if (!newCustomer.email) newErrors.email = "Email is required";
        if (!newCustomer.phone) newErrors.phone = "Phone is required";
        if (!newCustomer.address) newErrors.address = "Address is required";
        if (!newCustomer.city) newErrors.city = "City is required";
        if (!newCustomer.state) newErrors.state = "State is required";
        if (!newCustomer.zipCode) newErrors.zipCode = "Zip Code is required";
        if (!newCustomer.joinDate) newErrors.joinDate = "Join Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddCustomer = () => {
        if (!validateForm()) return;

        const newCustomerEntry: Customer = {
            ...newCustomer,
            id: Math.max(...customersState.map(c => c.id), 0) + 1
        };

        setCustomersState([...customersState, newCustomerEntry]);
        setIsAddCustomerModalOpen(false);
        setNewCustomer({
            id: 0,
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            joinDate: "",
            lastPurchase: "",
            totalSpent: "Rs.0"
        });
    };

    const filteredCustomers = customersState.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCustomers = filteredCustomers.sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "totalSpent") {
            const amountA = parseFloat(a.totalSpent.replace(/[^0-9.-]+/g, ""));
            const amountB = parseFloat(b.totalSpent.replace(/[^0-9.-]+/g, ""));
            return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
        } else if (sortBy === "joinDate") {
            return sortOrder === "asc"
                ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
                : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedCustomers.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedCustomers.length);
    const totalEntries = sortedCustomers.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Customers</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-4">All Customers</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search customers..."
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => setIsAddCustomerModalOpen(true)}
                                >
                                    Add Customer
                                </Button>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="totalSpent">Total Spent</MenuItem>
                                        <MenuItem value="joinDate">Join Date</MenuItem>
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
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Join Date</TableCell>
                                        <TableCell>Last Purchase</TableCell>
                                        <TableCell>Total Spent</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedCustomers
                                    ).map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.id}</TableCell>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.phone}</TableCell>
                                            <TableCell>{customer.city}</TableCell>
                                            <TableCell>{customer.joinDate}</TableCell>
                                            <TableCell>{customer.lastPurchase}</TableCell>
                                            <TableCell>{customer.totalSpent}</TableCell>
                                            <TableCell sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEdit(customer)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(customer)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={9} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={9} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={9}
                                                    count={sortedCustomers.length}
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
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            {/* Update Modal */}
            <Modal open={!!editCustomer} onClose={() => setEditCustomer(null)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    backgroundColor: darkMode ? "background.paper" : "background.default",
                    boxShadow: 24,
                    p: 4,
                    color: darkMode ? "text.primary" : "text.secondary"
                }}>
                    <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
                    <TextField
                        label="Name"
                        value={editCustomer?.name || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={editCustomer?.email || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        value={editCustomer?.phone || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, phone: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        value={editCustomer?.address || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, address: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City"
                        value={editCustomer?.city || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, city: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="State"
                        value={editCustomer?.state || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, state: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Zip Code"
                        value={editCustomer?.zipCode || ""}
                        onChange={(e) => setEditCustomer({ ...editCustomer!, zipCode: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <DialogActions>
                        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setEditCustomer(null)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteCustomer} onClose={() => setDeleteCustomer(null)}>
                <DialogTitle>Delete Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the customer &quot;{deleteCustomer?.name}&quot;?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteCustomer(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Customer Modal */}
            <Modal open={isAddCustomerModalOpen} onClose={() => setIsAddCustomerModalOpen(false)}>
                <Grid sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    backgroundColor: darkMode ? "background.paper" : "background.default",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    color: darkMode ? "text.primary" : "text.secondary"
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Add New Customer
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                value={newCustomer.name}
                                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                value={newCustomer.email}
                                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone"
                                value={newCustomer.phone}
                                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                value={newCustomer.address}
                                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.address}
                                helperText={errors.address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                value={newCustomer.city}
                                onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.city}
                                helperText={errors.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="State"
                                value={newCustomer.state}
                                onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.state}
                                helperText={errors.state}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Zip Code"
                                value={newCustomer.zipCode}
                                onChange={(e) => setNewCustomer({ ...newCustomer, zipCode: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.zipCode}
                                helperText={errors.zipCode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Join Date"
                                    value={newCustomer.joinDate ? dayjs(newCustomer.joinDate) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setNewCustomer({ ...newCustomer, joinDate: newValue ? newValue.format('YYYY/MM/DD') : "" });
                                    }}
                                    sx={{ width: '100%', mt: 2 }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.joinDate,
                                            helperText: errors.joinDate
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Last Purchase"
                                    value={newCustomer.lastPurchase ? dayjs(newCustomer.lastPurchase) : null}
                                    onChange={(newValue: Dayjs | null) => {
                                        setNewCustomer({ ...newCustomer, lastPurchase: newValue ? newValue.format('YYYY/MM/DD') : "" });
                                    }}
                                    sx={{ width: '100%', mt: 2 }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleAddCustomer}
                        >
                            Add Customer
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsAddCustomerModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </Modal>
        </div>
    );
}