import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { saveAs } from 'file-saver';

// theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

// core
import "primereact/resources/primereact.min.css";


interface FilterValue {
  value: any;
  matchMode: string | null;
}

interface FilterState {
  email: FilterValue;
  category: FilterValue;
  amount: FilterValue;
  date: FilterValue;
}

export default function BasicFilterDemo({ tableData }) {
  console.log("🚀 ~ file: Table.tsx:60 ~ BasicFilterDemo ~ tableData:", tableData)
  const [filters, setFilters] = useState<FilterState>({
    email: { value: null, matchMode: 'contains' },
    category: { value: null, matchMode: 'equals' },
    amount: { value: null, matchMode: 'equals' },
    date: { value: null, matchMode: null }
  });
  


  const handleDownloadCSV = () => {
    const csvData = tableData.map((data) => [data.id,data.email, data.category, data.amount, data.date]).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "emails.csv");
  };

  const onFilterChange = (field: keyof FilterState, value: any) => {
    const updatedFilters = { ...filters };
    updatedFilters[field].value = value;
    setFilters(updatedFilters);
  };

  const getFilterOptions = (field: string) => {
    if (field === 'date') {
      return [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Daily', value: 'daily' },
      ];
    } else {
      const uniqueValues = new Set(tableData?.map((item) => item[field]));
      return Array.from(uniqueValues).map((value) => ({
        label: value,
        value: value,
      }));
    }
  };

  const categoryFilterElement = (
    <Dropdown
      value={filters.category.value}
      options={getFilterOptions('category')}
      onChange={(e) => onFilterChange('category', e.value)}
      showClear
      placeholder="Filter by category"
    />
  );

  const dateFilterElement = (
    <Dropdown
      value={filters.date.value}
      options={getFilterOptions('date')}
      onChange={(e) => onFilterChange('date', e.value)}
      showClear
      placeholder="Filter by date"
    />
  );

  const categoryBodyTemplate = (rowData: any) => {
    return <span>{rowData.category}</span>;
  };

  const dateBodyTemplate = (rowData: any) => {
    const dateValue = new Date(rowData.date);
    const formattedDate = dateValue.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return <span>{formattedDate}</span>;
  };

  const amountBodyTemplate = (rowData: any) => {
    return <span>{rowData.amount}</span>;
  };

  const header = (
    <div className="p-d-flex p-jc-between">
      <span>
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => onFilterChange('email', e.target.value)}
          placeholder="Search by email"
        />
      </span>
      <span>{categoryFilterElement}</span>
      <span>{dateFilterElement}</span>
    </div>
  );

  const filterValueMatches = (rowData: any, field: keyof FilterState) => {
    const filter = filters[field];
    const value = filter.value;
    if (!value) return true;

    const fieldValue = rowData[field];
    if (filter.matchMode === 'contains') {
      return fieldValue.toLowerCase().includes(value.toLowerCase());
    } else if (filter.matchMode === 'equals') {
      return fieldValue === value;
    }
    return true;
  };

  const filterDateByOption = (rowData: any, option: string) => {
    const filter = filters.date;
    if (!option || !filter.value) return true;

    const dateValue = new Date(rowData.date);
    const currentDate = new Date();

    switch (option) {
      case 'daily':
        return (
          dateValue.getDate() === currentDate.getDate() &&
          dateValue.getMonth() === currentDate.getMonth() &&
          dateValue.getFullYear() === currentDate.getFullYear()
        );
      case 'monthly':
        return (
          dateValue.getMonth() === currentDate.getMonth() &&
          dateValue.getFullYear() === currentDate.getFullYear()
        );
      case 'weekly':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return dateValue >= oneWeekAgo && dateValue <= currentDate;
      default:
        return true;
    }
  };

  const filteredData = tableData?.filter((rowData) => {
    return (
      filterValueMatches(rowData, 'email') &&
      filterValueMatches(rowData, 'category') &&
      filterValueMatches(rowData, 'amount') &&
      filterDateByOption(rowData, filters.date.value)
    );
  });

  return (
    <div className="bg-gray-400 p-8 rounded mb-4">
      <div className="p-d-flex p-jc-between mb-4">
      
        <button className="p-button" onClick={handleDownloadCSV}>
          Export as CSV
        </button>
      </div>
      <DataTable
        value={filteredData}
        paginator
        rows={10}
        dataKey="id"
        header={header}
        emptyMessage="No data found."
      >
        <Column field="email" header="Email" sortable />
        <Column
          field="category"
          header="Category"
          sortable
          body={categoryBodyTemplate}
        />
        <Column
          field="amount"
          header="Amount"
          sortable
          body={amountBodyTemplate}
        />
        <Column
          field="date"
          header="Date"
          sortable
          body={dateBodyTemplate}
        />
      </DataTable>
    </div>
  );
}
