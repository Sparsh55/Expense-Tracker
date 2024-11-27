import React from 'react';
import styled from 'styled-components';

const ErrorNotification = ({ message }) => (
  <NotificationContainer>
    {message}
  </NotificationContainer>
);

const NotificationContainer = styled.div`
  background-color: #f2dede;
  color: #a94442;
  padding: 10px 20px;
  margin: 10px 0;
  border: 1px solid #ebccd1;
  border-radius: 5px;
  text-align: center;
`;

export default ErrorNotification;
