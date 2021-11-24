import React from 'react';
import { Pagination } from 'semantic-ui-react';

function PaginationComp({ pagination, activePage, pageChange, deviceType }) {
  return (
    <div className='headerValueCenter'>
      <Pagination
        // defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        totalPages={pagination}
        activePage={activePage}
        onPageChange={(event, data) => pageChange(event, data)}
        size={deviceType === 'mobile' && 'mini'}
      />
    </div>
  );
}

export default PaginationComp;
