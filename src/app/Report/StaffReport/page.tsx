// src/app/Report/StaffReport/page.tsx

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
import { TableHead, Typography, Button } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import PrintIcon from "@mui/icons-material/Print";

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

interface StaffProduct {
    id: number;
    image: string;
    name: string;
    totalProductSale: number;
    totalRevenue: number;
}

const initialProducts: StaffProduct[] = [
    { id: 1, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 2, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 3, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 4, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 5, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 6, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 7, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
    { id: 8, image: "", name: "saman", totalProductSale: 678, totalRevenue: 4500 },
];

export default function StaffReportPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [products] = useState<StaffProduct[]>(initialProducts);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [monthFilter, setMonthFilter] = useState("all");
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value as string);
        setPage(0);
    };

    const handleMonthFilterChange = (event: SelectChangeEvent) => {
        setMonthFilter(event.target.value as string);
        setPage(0);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Staff Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .title { font-size: 24px; font-weight: bold; }
                        .date { font-size: 14px; color: #666; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="title">Staff Report</div>
                        <div class="date">Generated on ${new Date().toLocaleDateString()}</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Total Product Sale</th>
                                <th>Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(product => `
                                <tr>
                                    <td></td>
                                    <td>${product.name}</td>
                                    <td>${product.totalProductSale}</td>
                                    <td>${product.totalRevenue}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        Showing data 1 to ${products.length} of ${products.length} entries
                    </div>
                    <script>
                        setTimeout(() => {
                            window.print();
                            window.close();
                        }, 500);
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredProducts.length);
    const totalEntries = filteredProducts.length;

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                    notificationCount={0}
                />
                <div className="p-4">
                    <div className="flex items-center">
                        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Staff Report
                        </h2>
                    </div>
                    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Typography variant="body1" color={darkMode ? 'text.secondary' : 'text.primary'}>
                                    All Products
                                </Typography>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                        label="Status"
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Month</InputLabel>
                                    <Select
                                        value={monthFilter}
                                        onChange={handleMonthFilterChange}
                                        label="Month"
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="january">January</MenuItem>
                                        <MenuItem value="february">February</MenuItem>
                                        <MenuItem value="march">March</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<PrintIcon />}
                                    onClick={handlePrint}
                                >
                                    Print
                                </Button>
                                <TextField
                                    placeholder="Search..."
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
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="staff report table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Total Product Sale</TableCell>
                                        <TableCell>Total Revenue</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : filteredProducts
                                    ).map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                                                )}
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.totalProductSale}</TableCell>
                                            <TableCell>{product.totalRevenue}</TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={4} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ borderBottom: "none" }}>
                                            <Box component="span" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Showing data {startEntry} to {endEntry} of {totalEntries} entries
                                                </Typography>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={4}
                                                    count={filteredProducts.length}
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
        </div>
    );
}