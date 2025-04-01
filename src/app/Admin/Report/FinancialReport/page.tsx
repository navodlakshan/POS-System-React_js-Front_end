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
    TableHead, Modal, TextField, Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, InputAdornment,
    Typography, Grid, FormControl, InputLabel, Select, MenuItem,
    SelectChangeEvent, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import TodayIcon from "@mui/icons-material/Today";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

interface FinancialRecord {
    id: number;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    paymentMethod: string;
    reference: string;
}

interface NewFinancialRecord {
    id: number;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    paymentMethod: string;
    reference: string;
}

const initialRecords: FinancialRecord[] = [
    { id: 1, date: "2023-01-15", description: "Product Sales", category: "Sales Revenue", amount: 125000, type: 'income', paymentMethod: "Credit Card", reference: "INV-001" },
    { id: 2, date: "2023-01-16", description: "Office Rent", category: "Rent", amount: 25000, type: 'expense', paymentMethod: "Bank Transfer", reference: "RENT-0123" },
    { id: 3, date: "2023-01-17", description: "Consulting Services", category: "Service Revenue", amount: 45000, type: 'income', paymentMethod: "Bank Transfer", reference: "CS-2023-01" },
    { id: 4, date: "2023-01-18", description: "Office Supplies", category: "Supplies", amount: 8500, type: 'expense', paymentMethod: "Credit Card", reference: "SUP-0118" },
    { id: 5, date: "2023-01-19", description: "Software Subscription", category: "Subscriptions", amount: 12000, type: 'expense', paymentMethod: "Bank Transfer", reference: "SUB-0119" },
    { id: 6, date: "2023-01-20", description: "Product Sales", category: "Sales Revenue", amount: 98000, type: 'income', paymentMethod: "Cash", reference: "INV-002" },
    { id: 7, date: "2023-01-21", description: "Marketing Campaign", category: "Marketing", amount: 35000, type: 'expense', paymentMethod: "Bank Transfer", reference: "MKT-0121" },
    { id: 8, date: "2023-01-22", description: "Training Services", category: "Service Revenue", amount: 28000, type: 'income', paymentMethod: "Credit Card", reference: "TS-2023-01" },
];

const categories = [
    { value: "Sales Revenue", label: "Sales Revenue", type: "income" },
    { value: "Service Revenue", label: "Service Revenue", type: "income" },
    { value: "Other Income", label: "Other Income", type: "income" },
    { value: "Rent", label: "Rent", type: "expense" },
    { value: "Salaries", label: "Salaries", type: "expense" },
    { value: "Supplies", label: "Supplies", type: "expense" },
    { value: "Marketing", label: "Marketing", type: "expense" },
    { value: "Subscriptions", label: "Subscriptions", type: "expense" },
    { value: "Utilities", label: "Utilities", type: "expense" },
];

const paymentMethods = ["Cash", "Credit Card", "Bank Transfer", "Check", "Other"];

export default function FinancialReportPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [records, setRecords] = useState<FinancialRecord[]>(initialRecords);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [dateFilterType, setDateFilterType] = useState<'none' | 'single' | 'range'>('none');
    const [singleDate, setSingleDate] = useState<string>("");
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: "",
        end: ""
    });
    const [sortBy, setSortBy] = useState<string>("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [editRecord, setEditRecord] = useState<FinancialRecord | null>(null);
    const [deleteRecord, setDeleteRecord] = useState<FinancialRecord | null>(null);
    const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false);
    const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
    const [newRecord, setNewRecord] = useState<NewFinancialRecord>({
        id: 0,
        date: new Date().toISOString().split('T')[0],
        description: "",
        category: "",
        amount: 0,
        type: 'income',
        paymentMethod: "Bank Transfer",
        reference: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
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

    const handleEdit = (record: FinancialRecord) => {
        setEditRecord(record);
    };

    const handleDelete = (record: FinancialRecord) => {
        setDeleteRecord(record);
    };

    const handleSave = () => {
        if (editRecord) {
            const updatedRecords = records.map((r) =>
                r.id === editRecord.id ? editRecord : r
            );
            setRecords(updatedRecords);
            setEditRecord(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteRecord) {
            const updatedRecords = records.filter((r) => r.id !== deleteRecord.id);
            setRecords(updatedRecords);
            setDeleteRecord(null);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleTypeFilterChange = (event: SelectChangeEvent<string>) => {
        setTypeFilter(event.target.value);
        setPage(0);
    };

    const handleCategoryFilterChange = (event: SelectChangeEvent<string>) => {
        setCategoryFilter(event.target.value);
        setPage(0);
    };

    const handleDateFilterTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilterType: 'none' | 'single' | 'range'
    ) => {
        if (newFilterType !== null) {
            setDateFilterType(newFilterType);
            setPage(0);
        }
    };

    const handleSingleDateChange = (value: string) => {
        setSingleDate(value);
        setPage(0);
    };

    const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
        setDateRange(prev => ({ ...prev, [field]: value }));
        setPage(0);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    };

    const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
        setSortOrder(event.target.value as "asc" | "desc");
    };

    const handlePrintPreview = () => {
        setIsPrintPreviewOpen(true);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Financial Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #333;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
            }
            .print-title {
              font-size: 22px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #2c3e50;
            }
            .print-date {
              font-size: 14px;
              color: #7f8c8d;
              margin-bottom: 10px;
            }
            .print-summary {
              font-size: 15px;
              margin-bottom: 15px;
              font-weight: 500;
            }
            .print-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .print-table th {
              background-color: #f8f9fa;
              text-align: left;
              padding: 10px;
              border: 1px solid #dee2e6;
              font-weight: 600;
            }
            .print-table td {
              padding: 8px 10px;
              border: 1px solid #dee2e6;
            }
            .print-table tr.income {
              background-color: #f0fff0;
            }
            .print-table tr.expense {
              background-color: #fff0f0;
            }
            .print-totals {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              font-weight: bold;
            }
            .print-footer {
              font-size: 12px;
              text-align: center;
              margin-top: 30px;
              color: #7f8c8d;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
            @media print {
              body {
                margin: 0;
                padding: 10px;
              }
              .print-header {
                margin-bottom: 15px;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <div class="print-title">Financial Report</div>
            <div class="print-date">Generated on: ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</div>
          </div>
          
          <div class="print-summary">
            ${dateFilterType === 'single' && singleDate ?
                `Date: ${new Date(singleDate).toLocaleDateString()}` :
                dateFilterType === 'range' ?
                    `Period: ${dateRange.start ? new Date(dateRange.start).toLocaleDateString() : 'All Time'} - 
                ${dateRange.end ? new Date(dateRange.end).toLocaleDateString() : 'Present'}` :
                    'All Time Period'}
          </div>
          
          <div class="print-totals">
            <div>Total Income: Rs.${records
                .filter(r => r.type === 'income')
                .reduce((sum, record) => sum + record.amount, 0)
                .toLocaleString()}</div>
            <div>Total Expenses: Rs.${records
                .filter(r => r.type === 'expense')
                .reduce((sum, record) => sum + record.amount, 0)
                .toLocaleString()}</div>
            <div>Net Profit: Rs.${(
                records.filter(r => r.type === 'income').reduce((sum, record) => sum + record.amount, 0) -
                records.filter(r => r.type === 'expense').reduce((sum, record) => sum + record.amount, 0)
            ).toLocaleString()}</div>
          </div>
          
          <table class="print-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(record => `
                <tr class="${record.type}">
                  <td>${new Date(record.date).toLocaleDateString()}</td>
                  <td>${record.description}</td>
                  <td>${record.category}</td>
                  <td>${record.type === 'income' ? 'Income' : 'Expense'}</td>
                  <td>Rs.${record.amount.toLocaleString()}</td>
                  <td>${record.paymentMethod}</td>
                  <td>${record.reference}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="print-footer">
            This report was generated automatically by the system.<br>
            © ${new Date().getFullYear()} ABC Company. All rights reserved.
          </div>
          
          <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()" style="padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Print Report
            </button>
            <button onclick="window.close()" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">
              Close Window
            </button>
          </div>
          
          <script>
            setTimeout(() => {
              window.print();
            }, 300);
            
            window.onafterprint = function() {
              setTimeout(() => {
                window.close();
              }, 300);
            };
          </script>
        </body>
        </html>
      `);
            printWindow.document.close();
        } else {
            alert('Popup blocker might be preventing the print window from opening. Please allow popups for this site.');
        }
        setIsPrintPreviewOpen(false);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newRecord.description) newErrors.description = "Description is required";
        if (!newRecord.category) newErrors.category = "Category is required";
        if (!newRecord.amount || newRecord.amount <= 0) newErrors.amount = "Valid amount is required";
        if (!newRecord.date) newErrors.date = "Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddRecord = () => {
        if (!validateForm()) return;

        const newRecordEntry: FinancialRecord = {
            id: Math.max(...records.map(r => r.id), 0) + 1,
            date: newRecord.date,
            description: newRecord.description,
            category: newRecord.category,
            amount: newRecord.amount,
            type: newRecord.type,
            paymentMethod: newRecord.paymentMethod,
            reference: newRecord.reference
        };

        setRecords([...records, newRecordEntry]);
        setIsAddRecordModalOpen(false);
        setNewRecord({
            id: 0,
            date: new Date().toISOString().split('T')[0],
            description: "",
            category: "",
            amount: 0,
            type: 'income',
            paymentMethod: "Bank Transfer",
            reference: ""
        });
    };

    const filteredRecords = records.filter((record) => {
        const matchesSearch = record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.reference.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = typeFilter === "all" || record.type === typeFilter;
        const matchesCategory = categoryFilter === "all" || record.category === categoryFilter;

        const recordDate = new Date(record.date);
        let matchesDate = true;

        if (dateFilterType === 'single' && singleDate) {
            const selectedDate = new Date(singleDate);
            matchesDate =
                recordDate.getFullYear() === selectedDate.getFullYear() &&
                recordDate.getMonth() === selectedDate.getMonth() &&
                recordDate.getDate() === selectedDate.getDate();
        } else if (dateFilterType === 'range') {
            matchesDate =
                (!dateRange.start || recordDate >= new Date(dateRange.start)) &&
                (!dateRange.end || recordDate <= new Date(dateRange.end));
        }

        return matchesSearch && matchesType && matchesCategory && matchesDate;
    });

    const sortedRecords = filteredRecords.sort((a, b) => {
        if (sortBy === "date") {
            return sortOrder === "asc" ?
                new Date(a.date).getTime() - new Date(b.date).getTime() :
                new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === "amount") {
            return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
        } else if (sortBy === "description") {
            return sortOrder === "asc" ?
                a.description.localeCompare(b.description) :
                b.description.localeCompare(a.description);
        } else if (sortBy === "category") {
            return sortOrder === "asc" ?
                a.category.localeCompare(b.category) :
                b.category.localeCompare(a.category);
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRecords.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedRecords.length);
    const totalEntries = sortedRecords.length;

    // Calculate totals for display
    const totalIncome = sortedRecords
        .filter(r => r.type === 'income')
        .reduce((sum, record) => sum + record.amount, 0);

    const totalExpenses = sortedRecords
        .filter(r => r.type === 'expense')
        .reduce((sum, record) => sum + record.amount, 0);

    const netProfit = totalIncome - totalExpenses;

    // Get unique categories for filter dropdown
    const incomeCategories = categories.filter(c => c.type === 'income').map(c => c.value);
    const expenseCategories = categories.filter(c => c.type === 'expense').map(c => c.value);
    const allCategories = [...incomeCategories, ...expenseCategories];

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {isSidebarVisible && <Sidebar />}
            <div className="flex-1 transition-all">
                <Header
                    onMenuClick={toggleSidebar}
                    onThemeToggle={toggleDarkMode}
                    darkMode={darkMode}
                />
                <div className="p-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Financial Report</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-4">Financial Transactions</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search transactions..."
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
                                    onClick={() => setIsAddRecordModalOpen(true)}
                                >
                                    Add Transaction
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<PrintIcon />}
                                    onClick={handlePrintPreview}
                                >
                                    Print
                                </Button>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={typeFilter}
                                        onChange={handleTypeFilterChange}
                                        label="Type"
                                    >
                                        <MenuItem value="all">All Types</MenuItem>
                                        <MenuItem value="income">Income</MenuItem>
                                        <MenuItem value="expense">Expense</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={categoryFilter}
                                        onChange={handleCategoryFilterChange}
                                        label="Category"
                                    >
                                        <MenuItem value="all">All Categories</MenuItem>
                                        {allCategories.map(category => (
                                            <MenuItem key={category} value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* Date Filter Controls */}
                        <div className="flex items-center gap-4 mb-4">
                            <ToggleButtonGroup
                                value={dateFilterType}
                                exclusive
                                onChange={handleDateFilterTypeChange}
                                aria-label="date filter type"
                                size="small"
                            >
                                <ToggleButton value="none" aria-label="no date filter">
                                    <Typography variant="caption">All Dates</Typography>
                                </ToggleButton>
                                <ToggleButton value="single" aria-label="single date">
                                    <TodayIcon fontSize="small" />
                                    <Typography variant="caption" sx={{ ml: 1 }}>Single Day</Typography>
                                </ToggleButton>
                                <ToggleButton value="range" aria-label="date range">
                                    <CalendarTodayIcon fontSize="small" />
                                    <Typography variant="caption" sx={{ ml: 1 }}>Date Range</Typography>
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {dateFilterType === 'single' && (
                                <TextField
                                    label="Select Date"
                                    type="date"
                                    size="small"
                                    value={singleDate}
                                    onChange={(e) => handleSingleDateChange(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TodayIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}

                            {dateFilterType === 'range' && (
                                <div className="flex gap-2">
                                    <TextField
                                        label="From"
                                        type="date"
                                        size="small"
                                        value={dateRange.start}
                                        onChange={(e) => handleDateRangeChange('start', e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRangeIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        label="To"
                                        type="date"
                                        size="small"
                                        value={dateRange.end}
                                        onChange={(e) => handleDateRangeChange('end', e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRangeIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                                <Typography variant="subtitle2" className="text-green-800 dark:text-green-200">
                                    Total Income
                                </Typography>
                                <Typography variant="h6" className="text-green-600 dark:text-green-300">
                                    Rs.{totalIncome.toLocaleString()}
                                </Typography>
                            </div>
                            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                                <Typography variant="subtitle2" className="text-red-800 dark:text-red-200">
                                    Total Expenses
                                </Typography>
                                <Typography variant="h6" className="text-red-600 dark:text-red-300">
                                    Rs.{totalExpenses.toLocaleString()}
                                </Typography>
                            </div>
                            <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-700' : netProfit >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
                                <Typography variant="subtitle2" className={netProfit >= 0 ? "text-blue-800 dark:text-blue-200" : "text-orange-800 dark:text-orange-200"}>
                                    Net Profit
                                </Typography>
                                <Typography variant="h6" className={netProfit >= 0 ? "text-blue-600 dark:text-blue-300" : "text-orange-600 dark:text-orange-300"}>
                                    Rs.{netProfit.toLocaleString()}
                                </Typography>
                            </div>
                        </div>

                        {/* Sort Controls */}
                        <div className="flex gap-4 mb-4">
                            <FormControl variant="outlined" size="small">
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    label="Sort By"
                                >
                                    <MenuItem value="date">Date</MenuItem>
                                    <MenuItem value="description">Description</MenuItem>
                                    <MenuItem value="category">Category</MenuItem>
                                    <MenuItem value="amount">Amount</MenuItem>
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

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Payment Method</TableCell>
                                        <TableCell>Reference</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedRecords
                                    ).map((record) => (
                                        <TableRow
                                            key={record.id}
                                            // sx={record.type === 'income' ? { bgcolor: 'success.light' } : { bgcolor: 'error.light' }}
                                        >
                                            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{record.description}</TableCell>
                                            <TableCell>{record.category}</TableCell>
                                            <TableCell>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: '999px',
                                                        fontSize: '0.75rem',
                                                        bgcolor: record.type === 'income' ? 'success.lighter' : 'error.lighter',
                                                        color: record.type === 'income' ? 'success.darker' : 'error.darker'
                                                    }}
                                                >
                                                    {record.type === 'income' ? 'Income' : 'Expense'}
                                                </Box>
                                            </TableCell>
                                            <TableCell>Rs.{record.amount.toLocaleString()}</TableCell>
                                            <TableCell>{record.paymentMethod}</TableCell>
                                            <TableCell>{record.reference}</TableCell>
                                            <TableCell sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEdit(record)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(record)}
                                                >
                                                    Delete
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
                                                    count={sortedRecords.length}
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
            <Modal open={!!editRecord} onClose={() => setEditRecord(null)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Edit Financial Record
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                type="date"
                                value={editRecord?.date || ""}
                                onChange={(e) => setEditRecord({ ...editRecord!, date: e.target.value })}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={editRecord?.type || "income"}
                                    onChange={(e) => setEditRecord({ ...editRecord!, type: e.target.value as 'income' | 'expense' })}
                                    label="Type"
                                >
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={editRecord?.description || ""}
                                onChange={(e) => setEditRecord({ ...editRecord!, description: e.target.value })}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={editRecord?.category || ""}
                                    onChange={(e) => setEditRecord({ ...editRecord!, category: e.target.value })}
                                    label="Category"
                                >
                                    {categories
                                        .filter(c => c.type === (editRecord?.type || 'income'))
                                        .map(category => (
                                            <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    value={editRecord?.paymentMethod || "Bank Transfer"}
                                    onChange={(e) => setEditRecord({ ...editRecord!, paymentMethod: e.target.value })}
                                    label="Payment Method"
                                >
                                    {paymentMethods.map(method => (
                                        <MenuItem key={method} value={method}>{method}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Amount"
                                type="number"
                                value={editRecord?.amount || 0}
                                onChange={(e) => setEditRecord({ ...editRecord!, amount: parseFloat(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Reference"
                                value={editRecord?.reference || ""}
                                onChange={(e) => setEditRecord({ ...editRecord!, reference: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setEditRecord(null)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteRecord} onClose={() => setDeleteRecord(null)}>
                <DialogTitle>Delete Financial Record</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this financial record?
                        <br />
                        <strong>Description:</strong> {deleteRecord?.description}
                        <br />
                        <strong>Amount:</strong> Rs.{deleteRecord?.amount.toLocaleString()}
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteRecord(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Record Modal */}
            <Modal open={isAddRecordModalOpen} onClose={() => setIsAddRecordModalOpen(false)}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Add New Financial Record
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                type="date"
                                value={newRecord.date}
                                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.date}
                                helperText={errors.date}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" error={!!errors.type}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={newRecord.type}
                                    onChange={(e) => {
                                        setNewRecord({
                                            ...newRecord,
                                            type: e.target.value as 'income' | 'expense',
                                            category: "" // Reset category when type changes
                                        });
                                    }}
                                    label="Type"
                                >
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={newRecord.description}
                                onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" error={!!errors.category}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={newRecord.category}
                                    onChange={(e) => setNewRecord({ ...newRecord, category: e.target.value })}
                                    label="Category"
                                >
                                    {categories
                                        .filter(c => c.type === newRecord.type)
                                        .map(category => (
                                            <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    value={newRecord.paymentMethod}
                                    onChange={(e) => setNewRecord({ ...newRecord, paymentMethod: e.target.value })}
                                    label="Payment Method"
                                >
                                    {paymentMethods.map(method => (
                                        <MenuItem key={method} value={method}>{method}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Amount"
                                type="number"
                                value={newRecord.amount}
                                onChange={(e) => setNewRecord({ ...newRecord, amount: parseFloat(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                                error={!!errors.amount}
                                helperText={errors.amount}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            Rs.
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Reference"
                                value={newRecord.reference}
                                onChange={(e) => setNewRecord({ ...newRecord, reference: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleAddRecord}
                        >
                            Save Record
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsAddRecordModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Print Preview Modal */}
            <Modal open={isPrintPreviewOpen} onClose={() => setIsPrintPreviewOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: '90vh',
                    overflow: 'auto'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                            Print Report
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Print Preview
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            This is how your report will look when printed.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Financial Report
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {dateFilterType === 'single' && singleDate ?
                            `Date: ${new Date(singleDate).toLocaleDateString()}` :
                            dateFilterType === 'range' ?
                                `Period: ${dateRange.start ? new Date(dateRange.start).toLocaleDateString() : 'All Time'} - 
                ${dateRange.end ? new Date(dateRange.end).toLocaleDateString() : 'Present'}` :
                                'All Time Period'}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
                        <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'success.light' }}>
                            <Typography variant="subtitle2" sx={{ color: 'success.contrastText' }}>
                                Total Income
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'success.contrastText' }}>
                                Rs.{totalIncome.toLocaleString()}
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'error.light' }}>
                            <Typography variant="subtitle2" sx={{ color: 'error.contrastText' }}>
                                Total Expenses
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'error.contrastText' }}>
                                Rs.{totalExpenses.toLocaleString()}
                            </Typography>
                        </Box>
                        <Box sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: netProfit >= 0 ? 'info.light' : 'warning.light'
                        }}>
                            <Typography variant="subtitle2" sx={{ color: netProfit >= 0 ? 'info.contrastText' : 'warning.contrastText' }}>
                                Net Profit
                            </Typography>
                            <Typography variant="h6" sx={{ color: netProfit >= 0 ? 'info.contrastText' : 'warning.contrastText' }}>
                                Rs.{netProfit.toLocaleString()}
                            </Typography>
                        </Box>
                    </Box>

                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Reference</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedRecords.map((record) => (
                                    <TableRow
                                        key={record.id}
                                        sx={record.type === 'income' ? { bgcolor: 'success.lighter' } : { bgcolor: 'error.lighter' }}
                                    >
                                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{record.description}</TableCell>
                                        <TableCell>{record.category}</TableCell>
                                        <TableCell>
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: '999px',
                                                    fontSize: '0.75rem',
                                                    bgcolor: record.type === 'income' ? 'success.lighter' : 'error.lighter',
                                                    color: record.type === 'income' ? 'success.darker' : 'error.darker'
                                                }}
                                            >
                                                {record.type === 'income' ? 'Income' : 'Expense'}
                                            </Box>
                                        </TableCell>
                                        <TableCell>Rs.{record.amount.toLocaleString()}</TableCell>
                                        <TableCell>{record.paymentMethod}</TableCell>
                                        <TableCell>{record.reference}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 3 }}>
                        This report was generated automatically by the system.
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        © {new Date().getFullYear()} INFINITY TECHNOLOGY (Pvt) Ltd. All rights reserved.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setIsPrintPreviewOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PrintIcon />}
                            onClick={handlePrint}
                        >
                            Print
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}