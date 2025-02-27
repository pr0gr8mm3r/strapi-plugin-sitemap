import React from 'react';

import { NoContent } from '@strapi/helper-plugin';
import Plus from '@strapi/icons/Plus';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { Table, Thead, Tbody, Tr, Th, TFooter } from '@strapi/design-system/Table';
import { TableLabel } from '@strapi/design-system/Text';
import { Button } from '@strapi/design-system/Button';
import { useIntl } from 'react-intl';

import CustomRow from './Row';

const ListComponent = (props) => {
  const { items, openModal } = props;
  const formattedItems = [];
  const { formatMessage } = useIntl();

  if (!items) {
    return null;
  }

  items.map((item, key) => {
    const formattedItem = {};
    formattedItem.name = key;
    formattedItem.priority = item.get('priority');
    formattedItem.changefreq = item.get('changefreq');
    formattedItem.onDelete = props.onDelete;

    formattedItems.push(formattedItem);
  });

  if (items.size === 0) {
    return (
      <NoContent
        content={{ id: 'sitemap.Empty.CustomURLs.Description' }}
        action={<Button onClick={() => openModal()}>{formatMessage({ id: 'sitemap.Empty.CustomURLs.Button' })}</Button>}
      />
    );
  }

  return (
    <Table colCount={4} rowCount={formattedItems.length + 1} footer={<TFooter onClick={() => openModal()} icon={<Plus />}>{formatMessage({ id: 'sitemap.Button.AddCustomURL' })}</TFooter>}>
      <Thead>
        <Tr>
          <Th>
            <TableLabel>URL</TableLabel>
          </Th>
          <Th>
            <TableLabel>Priority</TableLabel>
          </Th>
          <Th>
            <TableLabel>ChangeFreq</TableLabel>
          </Th>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {formattedItems.map((item) => (
          <CustomRow key={item.name} entry={item} openModal={openModal} />
        ))}
      </Tbody>
    </Table>
  );
};

export default ListComponent;
