"use client";

import React, { useState } from "react";
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
    Button,
    InputAdornment,
    Typography,
    Grid,
    TextField
} from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CashierSidebar from "@/components/CashierSidebar";
import CashierHeader from "@/components/CashierHeader";

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

interface BillItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Bill {
    id: string;
    customerName: string;
    orderNumber: string;
    date: string;
    items: BillItem[];
    subtotal: number;
    tax: number;
    total: number;
    notes: string;
}

const initialBills: Bill[] = [
    {
        id: "1",
        customerName: "John Doe",
        orderNumber: "ORD-001",
        date: "2024/03/01",
        items: [
            { id: "1", name: "Samsung QLED 4K TV", price: 999.99, quantity: 1 },
            { id: "7", name: "Bose Headphones 700", price: 379.99, quantity: 2 }
        ],
        subtotal: 1759.97,
        tax: 175.99,
        total: 1935.96,
        notes: "Customer requested delivery"
    },
    {
        id: "2",
        customerName: "Jane Smith",
        orderNumber: "ORD-002",
        date: "2024/03/02",
        items: [
            { id: "11", name: "iPhone 14 Pro", price: 999.99, quantity: 1 },
            { id: "13", name: "MacBook Pro 14\"", price: 1999.99, quantity: 1 }
        ],
        subtotal: 2999.98,
        tax: 299.99,
        total: 3299.97,
        notes: "Corporate purchase"
    }
];

export default function CashierBillPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [bills] = useState<Bill[]>(initialBills);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);

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

    const handleViewBill = (bill: Bill) => {
        setSelectedBill(bill);
    };

    const handlePrintBill = (bill: Bill) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Bill Receipt - ${bill.orderNumber}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .header { text-align: center; margin-bottom: 20px; }
                            .store-name { font-size: 24px; font-weight: bold; }
                            .bill-info { margin-bottom: 20px; }
                            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            .total-section { text-align: right; font-weight: bold; }
                            .footer { margin-top: 30px; text-align: center; font-size: 12px; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <div class="store-name">My Store</div>
                            <div>123 Main Street, City</div>
                            <div>Phone: (123) 456-7890</div>
                        </div>
                        
                        <div class="bill-info">
                            <div><strong>Customer:</strong> ${bill.customerName}</div>
                            <div><strong>Order #:</strong> ${bill.orderNumber}</div>
                            <div><strong>Date:</strong> ${bill.date}</div>
                        </div>
                        
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bill.items.map(item => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>Rs.${item.price.toFixed(2)}</td>
                                        <td>Rs.${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <div class="total-section">
                            <div>Subtotal: Rs.${bill.subtotal.toFixed(2)}</div>
                            <div>Tax (10%): Rs.${bill.tax.toFixed(2)}</div>
                            <div>Total: Rs.${bill.total.toFixed(2)}</div>
                        </div>
                        
                        ${bill.notes ? `<div><strong>Notes:</strong> ${bill.notes}</div>` : ''}
                        
                        <div class="footer">
                            Thank you for your purchase!<br>
                            Please come again
                        </div>
                        
                        <script>
                            setTimeout(() => {
                                window.print();
                                window.close();
                            }, 200);
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const filteredBills = bills.filter(bill =>
        bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ).filter(bill => {
        if (!fromDate && !toDate) return true;
        const billDate = new Date(bill.date).getTime();
        const from = fromDate ? new Date(fromDate).getTime() : 0;
        const to = toDate ? new Date(toDate).getTime() : Date.now();
        return billDate >= from && billDate <= to;
    });

    const sortedBills = filteredBills.sort((a, b) => {
        if (sortBy === "date") {
            return sortOrder === "asc"
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === "customer") {
            return sortOrder === "asc"
                ? a.customerName.localeCompare(b.customerName)
                : b.customerName.localeCompare(a.customerName);
        } else if (sortBy === "total") {
            return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedBills.length) : 0;
    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedBills.length);
    const totalEntries = sortedBills.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <CashierSidebar />}
            <div className="flex-1 transition-all">
                <CashierHeader
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    notificationCount={0}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bills</h2>
                    </div>
                    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>All Issued Bills</h2>
                        <div className="flex justify-between mb-4 flex-wrap gap-4">
                            <TextField
                                placeholder="Search bills..."
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
                                sx={{ minWidth: 250 }}
                            />
                            <div className="flex gap-4 flex-wrap">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="From Date"
                                        value={fromDate ? dayjs(fromDate) : null}
                                        onChange={(newValue) => {
                                            setFromDate(newValue ? newValue.format('YYYY/MM/DD') : null);
                                        }}
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                    <DatePicker
                                        label="To Date"
                                        value={toDate ? dayjs(toDate) : null}
                                        onChange={(newValue) => {
                                            setToDate(newValue ? newValue.format('YYYY/MM/DD') : null);
                                        }}
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </LocalizationProvider>
                                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="date">Date</MenuItem>
                                        <MenuItem value="customer">Customer</MenuItem>
                                        <MenuItem value="total">Total Amount</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
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
                                        <TableCell>Order #</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Items</TableCell>
                                        <TableCell>Subtotal</TableCell>
                                        <TableCell>Tax</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedBills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedBills
                                    ).map((bill) => (
                                        <TableRow key={bill.id}>
                                            <TableCell>{bill.orderNumber}</TableCell>
                                            <TableCell>{bill.customerName}</TableCell>
                                            <TableCell>{bill.date}</TableCell>
                                            <TableCell>{bill.items.length}</TableCell>
                                            <TableCell>Rs.{bill.subtotal.toFixed(2)}</TableCell>
                                            <TableCell>Rs.{bill.tax.toFixed(2)}</TableCell>
                                            <TableCell>Rs.{bill.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleViewBill(bill)}
                                                    sx={{ mr: 1 }}
                                                    startIcon={<VisibilityIcon />}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => handlePrintBill(bill)}
                                                    startIcon={<PrintIcon />}
                                                >
                                                    Print
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={8} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={8} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={8}
                                                    count={sortedBills.length}
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

            {/* Bill Details Modal */}
            <Modal open={!!selectedBill} onClose={() => setSelectedBill(null)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    backgroundColor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    outline: 'none'
                }}>
                    {selectedBill && (
                        <>
                            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                                Bill Details - {selectedBill.orderNumber}
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Customer:</strong> {selectedBill.customerName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Date:</strong> {selectedBill.date}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <TableContainer component={Paper} sx={{ mb: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell align="right">Qty</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedBill.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">Rs.{item.price.toFixed(2)}</TableCell>
                                                <TableCell align="right">Rs.{(item.price * item.quantity).toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item xs={6}>
                                    {selectedBill.notes && (
                                        <Typography variant="body1">
                                            <strong>Notes:</strong> {selectedBill.notes}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body1">
                                            <strong>Subtotal:</strong> Rs.{selectedBill.subtotal.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Tax (10%):</strong> Rs.{selectedBill.tax.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                                            <strong>Total:</strong> Rs.{selectedBill.total.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<PrintIcon />}
                                    onClick={() => {
                                        handlePrintBill(selectedBill);
                                        setSelectedBill(null);
                                    }}
                                >
                                    Print Bill
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setSelectedBill(null)}
                                >
                                    Close
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}