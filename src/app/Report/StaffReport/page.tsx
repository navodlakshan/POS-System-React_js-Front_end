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
import { TableHead, Modal, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Typography, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

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

interface StaffMember {
    id: number;
    image: string;
    name: string;
    position: string;
    totalSales: number;
    totalRevenue: number;
    joinDate: string;
    status: 'active' | 'inactive';
}

interface NewStaffMember {
    id: number;
    image: string;
    name: string;
    position: string;
    totalSales: number;
    totalRevenue: number;
    joinDate: string;
    status: 'active' | 'inactive';
}

const initialStaff: StaffMember[] = [
    { id: 1, image: "", name: "John Doe", position: "Sales Manager", totalSales: 245, totalRevenue: 125000, joinDate: "2022-01-15", status: 'active' },
    { id: 2, image: "", name: "Jane Smith", position: "Sales Associate", totalSales: 189, totalRevenue: 98750, joinDate: "2022-03-22", status: 'active' },
    { id: 3, image: "", name: "Robert Johnson", position: "Sales Executive", totalSales: 312, totalRevenue: 156000, joinDate: "2021-11-05", status: 'active' },
    { id: 4, image: "", name: "Emily Davis", position: "Marketing Specialist", totalSales: 120, totalRevenue: 60000, joinDate: "2022-05-18", status: 'inactive' },
    { id: 5, image: "", name: "Michael Wilson", position: "Sales Director", totalSales: 420, totalRevenue: 210000, joinDate: "2020-08-30", status: 'active' },
    { id: 6, image: "", name: "Sarah Brown", position: "Sales Coordinator", totalSales: 95, totalRevenue: 47500, joinDate: "2022-07-12", status: 'active' },
    { id: 7, image: "", name: "David Lee", position: "Sales Consultant", totalSales: 276, totalRevenue: 138000, joinDate: "2021-09-25", status: 'inactive' },
    { id: 8, image: "", name: "Jennifer Taylor", position: "Sales Representative", totalSales: 201, totalRevenue: 100500, joinDate: "2022-02-14", status: 'active' },
];

export default function StaffReportPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [staffState, setStaffState] = useState<StaffMember[]>(initialStaff);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [positionFilter, setPositionFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [editStaff, setEditStaff] = useState<StaffMember | null>(null);
    const [deleteStaff, setDeleteStaff] = useState<StaffMember | null>(null);
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
    const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
    const [newStaff, setNewStaff] = useState<NewStaffMember>({
        id: 0,
        image: "",
        name: "",
        position: "",
        totalSales: 0,
        totalRevenue: 0,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active'
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

    const handleEdit = (staff: StaffMember) => {
        setEditStaff(staff);
    };

    const handleDelete = (staff: StaffMember) => {
        setDeleteStaff(staff);
    };

    const handleSave = () => {
        if (editStaff) {
            const updatedStaff = staffState.map((s) =>
                s.id === editStaff.id ? editStaff : s
            );
            setStaffState(updatedStaff);
            setEditStaff(null);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteStaff) {
            const updatedStaff = staffState.filter((s) => s.id !== deleteStaff.id);
            setStaffState(updatedStaff);
            setDeleteStaff(null);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
        setStatusFilter(event.target.value);
        setPage(0);
    };

    const handlePositionFilterChange = (event: SelectChangeEvent<string>) => {
        setPositionFilter(event.target.value);
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
                    <title>Staff Report</title>
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
                        .print-table tr:nth-child(even) {
                            background-color: #f8f9fa;
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
                        <div class="print-title">Staff Performance Report</div>
                        <div class="print-date">Generated on: ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</div>
                    </div>
                    
                    <div class="print-summary">
                        Total Staff Members: ${staffState.length} | 
                        Active Staff: ${staffState.filter(s => s.status === 'active').length} | 
                        Total Revenue: Rs.${staffState.reduce((sum, staff) => sum + staff.totalRevenue, 0).toLocaleString()}
                    </div>
                    
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Total Sales</th>
                                <th>Total Revenue</th>
                                <th>Join Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${staffState.map(staff => `
                                <tr>
                                    <td>${staff.name}</td>
                                    <td>${staff.position}</td>
                                    <td>${staff.totalSales}</td>
                                    <td>Rs.${staff.totalRevenue.toLocaleString()}</td>
                                    <td>${new Date(staff.joinDate).toLocaleDateString()}</td>
                                    <td>${staff.status === 'active' ? 'Active' : 'Inactive'}</td>
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
        if (!newStaff.name) newErrors.name = "Staff name is required";
        if (!newStaff.position) newErrors.position = "Position is required";
        if (!newStaff.joinDate) newErrors.joinDate = "Join date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddStaff = () => {
        if (!validateForm()) return;

        const newStaffEntry: StaffMember = {
            id: Math.max(...staffState.map(s => s.id), 0) + 1,
            image: newStaff.image,
            name: newStaff.name,
            position: newStaff.position,
            totalSales: newStaff.totalSales,
            totalRevenue: newStaff.totalRevenue,
            joinDate: newStaff.joinDate,
            status: newStaff.status
        };

        setStaffState([...staffState, newStaffEntry]);
        setIsAddStaffModalOpen(false);
        setNewStaff({
            id: 0,
            image: "",
            name: "",
            position: "",
            totalSales: 0,
            totalRevenue: 0,
            joinDate: new Date().toISOString().split('T')[0],
            status: 'active'
        });
    };

    const filteredStaff = staffState.filter((staff) => {
        const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.position.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
        const matchesPosition = positionFilter === "all" || staff.position === positionFilter;

        return matchesSearch && matchesStatus && matchesPosition;
    });

    const sortedStaff = filteredStaff.sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "position") {
            return sortOrder === "asc" ? a.position.localeCompare(b.position) : b.position.localeCompare(a.position);
        } else if (sortBy === "totalSales") {
            return sortOrder === "asc" ? a.totalSales - b.totalSales : b.totalSales - a.totalSales;
        } else if (sortBy === "totalRevenue") {
            return sortOrder === "asc" ? a.totalRevenue - b.totalRevenue : b.totalRevenue - a.totalRevenue;
        } else if (sortBy === "joinDate") {
            return sortOrder === "asc" ?
                new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime() :
                new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        }
        return 0;
    });

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedStaff.length) : 0;

    const startEntry = page * rowsPerPage + 1;
    const endEntry = Math.min((page + 1) * rowsPerPage, sortedStaff.length);
    const totalEntries = sortedStaff.length;

    // Get unique positions for filter dropdown
    const positions = Array.from(new Set(staffState.map(staff => staff.position)));

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
                        <h2 className="text-2xl font-bold mb-4">Staff Performance Report</h2>
                    </div>
                    <div className="p-6 bg-background text-gray-500 dark:text-gray-300 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-bold mb-4">Staff Members</h2>
                        <div className="flex justify-between mb-4">
                            <TextField
                                placeholder="Search staff..."
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
                                    onClick={() => setIsAddStaffModalOpen(true)}
                                >
                                    Add Staff
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
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                        label="Status"
                                    >
                                        <MenuItem value="all">All Status</MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Position</InputLabel>
                                    <Select
                                        value={positionFilter}
                                        onChange={handlePositionFilterChange}
                                        label="Position"
                                    >
                                        <MenuItem value="all">All Positions</MenuItem>
                                        {positions.map(position => (
                                            <MenuItem key={position} value={position}>{position}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="position">Position</MenuItem>
                                        <MenuItem value="totalSales">Total Sales</MenuItem>
                                        <MenuItem value="totalRevenue">Total Revenue</MenuItem>
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
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Position</TableCell>
                                        <TableCell>Total Sales</TableCell>
                                        <TableCell>Total Revenue</TableCell>
                                        <TableCell>Join Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? sortedStaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedStaff
                                    ).map((staff) => (
                                        <TableRow key={staff.id}>
                                            <TableCell component="th" scope="row">
                                                {staff.image ? (
                                                    <Image
                                                        src={staff.image}
                                                        alt={staff.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                                                )}
                                            </TableCell>
                                            <TableCell>{staff.name}</TableCell>
                                            <TableCell>{staff.position}</TableCell>
                                            <TableCell>{staff.totalSales}</TableCell>
                                            <TableCell>Rs.{staff.totalRevenue.toLocaleString()}</TableCell>
                                            <TableCell>{new Date(staff.joinDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    staff.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {staff.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                            </TableCell>
                                            <TableCell sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color= "primary"
                                                    size="small"
                                                    onClick={() => handleEdit(staff)}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(staff)}
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
                                                    count={sortedStaff.length}
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
            <Modal open={!!editStaff} onClose={() => setEditStaff(null)}>
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
                    <h2 className="text-xl font-bold mb-4">Edit Staff Member</h2>
                    <TextField
                        label="Name"
                        value={editStaff?.name || ""}
                        onChange={(e) => setEditStaff({ ...editStaff!, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Position"
                        value={editStaff?.position || ""}
                        onChange={(e) => setEditStaff({ ...editStaff!, position: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Total Sales"
                        type="number"
                        value={editStaff?.totalSales || 0}
                        onChange={(e) => setEditStaff({ ...editStaff!, totalSales: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Total Revenue"
                        type="number"
                        value={editStaff?.totalRevenue || 0}
                        onChange={(e) => setEditStaff({ ...editStaff!, totalRevenue: parseInt(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Join Date"
                        type="date"
                        value={editStaff?.joinDate || ""}
                        onChange={(e) => setEditStaff({ ...editStaff!, joinDate: e.target.value })}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={editStaff?.status || "active"}
                            onChange={(e) => setEditStaff({ ...editStaff!, status: e.target.value as 'active' | 'inactive' })}
                            label="Status"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setEditStaff(null)}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteStaff} onClose={() => setDeleteStaff(null)}>
                <DialogTitle>Delete Staff Member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the staff member &quot;{deleteStaff?.name}&quot;?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setDeleteStaff(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Staff Modal */}
            <Modal open={isAddStaffModalOpen} onClose={() => setIsAddStaffModalOpen(false)}>
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
                        Add New Staff Member
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                value={newStaff.name}
                                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Position"
                                value={newStaff.position}
                                onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                                fullWidth
                                margin="normal"
                                error={!!errors.position}
                                helperText={errors.position}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Total Sales"
                                type="number"
                                value={newStaff.totalSales}
                                onChange={(e) => setNewStaff({ ...newStaff, totalSales: parseInt(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Total Revenue"
                                type="number"
                                value={newStaff.totalRevenue}
                                onChange={(e) => setNewStaff({ ...newStaff, totalRevenue: parseInt(e.target.value) || 0 })}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Join Date"
                                type="date"
                                value={newStaff.joinDate}
                                onChange={(e) => setNewStaff({ ...newStaff, joinDate: e.target.value })}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.joinDate}
                                helperText={errors.joinDate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={newStaff.status}
                                    onChange={(e) => setNewStaff({ ...newStaff, status: e.target.value as 'active' | 'inactive' })}
                                    label="Status"
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleAddStaff}
                        >
                            Save Staff
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => setIsAddStaffModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
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
                    bgcolor: darkMode ? "background.paper" : "background.default",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: '90vh',
                    overflow: 'auto',
                    color: darkMode ? "text.primary" : "text.secondary"
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
                            Staff Performance Report
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Total Staff Members: {staffState.length} |
                        Active Staff: {staffState.filter(s => s.status === 'active').length} |
                        Total Revenue: Rs.{staffState.reduce((sum, staff) => sum + staff.totalRevenue, 0).toLocaleString()}
                    </Typography>

                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Total Sales</TableCell>
                                    <TableCell>Total Revenue</TableCell>
                                    <TableCell>Join Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staffState.map((staff) => (
                                    <TableRow key={staff.id}>
                                        <TableCell>{staff.name}</TableCell>
                                        <TableCell>{staff.position}</TableCell>
                                        <TableCell>{staff.totalSales}</TableCell>
                                        <TableCell>Rs.{staff.totalRevenue.toLocaleString()}</TableCell>
                                        <TableCell>{new Date(staff.joinDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{staff.status === 'active' ? 'Active' : 'Inactive'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 3 }}>
                        This report was generated automatically by the system.
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        © {new Date().getFullYear()} ABC Company. All rights reserved.
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