import Div from "@jumbo/shared/Div";
import { Box, CircularProgress } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { companyServices } from 'app/services/companyservices';
import React from 'react';
import { useQuery } from 'react-query';
import CompanyDetailDialog from './CompanyDetailDialog';


const compColumns = [
  { field: 'companyName', headerName: 'Company Name', width: 300 },
  { field: 'address', headerName: 'Address', width: 400 },
  { field: 'gstNo', headerName: 'GST Number', width: 200 }

]


const Company_Details = () => {

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const query = useQuery(['companyList', { page }], () => companyServices.list(page), {
    useCursorPagination: false,
  });
  console.log("result of query: ", query)

  const totalrows = query.data?.count;
  const compData = query?.data?.data ?? [];
  console.log("result of compData: ", compData)


  const [rowCountState, setRowCountState] = React.useState(
    totalrows || 0
  );
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalrows !== undefined
        ? totalrows
        : prevRowCountState
    );
  }, [totalrows, setRowCountState]);


  console.log("result of rowCountState: ", rowCountState)
  console.log("result of compData: ", compData?.count)



  const [cId, setId] = React.useState();

  const handleRowClick = (compId) => {
    setId(compId.row.id);
  }

  const handleDialogClose = React.useCallback(() => {
    setId(null);
  }, []);

  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
          ),

          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  }));






  const CustomLoadingOverlay = () => {
    return (
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress color="inherit" />
      </div>
    );
  };





  return (
    <Div>
      <Box sx={{ height: 675, width: '100%', backgroundColor: 'White' }}>
        <StripedDataGrid

          rows={compData}
          columns={compColumns}
          checkboxSelection
          disableSelectionOnClick
          components={{
            LoadingOverlay: CustomLoadingOverlay,
            Toolbar: GridToolbar,
          }}
          pagination
          page={page - 1}
          paginationMode="server"
          rowsPerPageOptions={[10]}
          pageSize={pageSize}
          rowCount={rowCountState}

          onPageChange={(newPage) => { setPage(newPage + 1); }}
          onPageSizeChange={(newPageSize) => { setPageSize(newPageSize); }}




          onRowClick={handleRowClick}
          loading={query.isLoading}

          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            }
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }

        />
      </Box>
      {
        cId && (
          <CompanyDetailDialog cId={cId} open={!!cId} onClose={handleDialogClose} />
        )
      }

    </Div>
  );
}

export default Company_Details;


