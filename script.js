
 let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  let accno= JSON.parse(localStorage.getItem('accno')) || 1000;

    function createAccount() {
      
        const fname = document.getElementById('fname').value.trim();
        const lname = document.getElementById('lname').value.trim();
        const depAmount = parseFloat(document.getElementById('depAmount').value.trim());

        if (!fname || !lname || isNaN(depAmount) || depAmount <= 0) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Check if account already exists
        const existingAccount = accounts.find(account => account.firstName === fname && account.lastName === lname);
        if (existingAccount) {
            alert('Account already exists.');
            return;
        }

        const history1={
            type: 'CREATE',
            amount: depAmount,
            date: new Date().toLocaleString(),
        }

        const newAccount = {
            firstName: fname,
            lastName: lname,
            accno: ++accno,
            depositAmount: depAmount,
            history: [history1],
        };

        accounts.push(newAccount);
       
        localStorage.setItem('accounts', JSON.stringify(accounts));
        localStorage.setItem('accno', accno);

        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('depAmount').value = '';

        
        alert('Account created successfully!');

        displayAccounts();
    }

    function displayAccounts() {
        const accountsListDiv = document.getElementById('accounts-list');

        accountsListDiv.innerHTML = '';

        // Generate HTML for each account
        accounts.forEach((account, index) => {
            const accountDiv = document.createElement('div');
            accountDiv.className = 'account';

            accountDiv.innerHTML = `
                <p>${account.firstName} ${account.lastName}</p>
                <p>Account ${account.accno}</p>
                <p>$${account.depositAmount.toFixed(2)}</p>
                <div>
                    <button onclick="deleteAccount(${index})">Delete</button>
                    <button onclick="viewTransactionHistory(${index})">Transaction History</button>
                </div>
            `;

            accountsListDiv.appendChild(accountDiv);
        });
    }

    function deleteAccount(index) {
        accounts.splice(index, 1);

        // Update local storage
        localStorage.setItem('accounts', JSON.stringify(accounts));

        // Refresh account list
        displayAccounts();
    }

    function viewTransactionHistory(index) {
      
        alert(`Transaction History for Account ${index + 1} (not implemented)`);
    }

    
    displayAccounts();

    // for depositAmount/////////////////////////////////////////

    function deposit(){
      // console.log("deposit");
      const accnoD = document.getElementById('acccno').value.trim();
      const depAmount = parseFloat(document.getElementById('depAmount').value.trim());
      const existingAccount = accounts.find(account => account.accno == accnoD);

      if ( !existingAccount|| isNaN(depAmount) || depAmount <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }
    const history1={
      type: 'deposit',
      amount: depAmount,
      date: new Date().toLocaleString(),
  }

     existingAccount.depositAmount += depAmount;
     existingAccount.history.push(history1);
    // alert(`Deposited ${depAmount} to Account ${existingAccount.accno}. New balance is ${existingAccount.balance}.`);
  
    console.log(accnoD,depAmount,accounts,existingAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    }

    /////////////////////////for withdrawAmount/////////////////////////////////////////

  
    
    function withdraw(){
      console.log("withdraw");
      const accnoD = document.getElementById('acccno').value.trim();
      const depAmount = parseFloat(document.getElementById('depAmount').value.trim());
      const existingAccount = accounts.find(account => account.accno == accnoD);

      if ( !existingAccount|| isNaN(depAmount) || depAmount <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }
    const history1={
      type: 'withdraw',
      amount: depAmount,
      date: new Date().toLocaleString(),
  }

     existingAccount.depositAmount -= depAmount;
     existingAccount.history.push(history1);
    // alert(`Deposited ${depAmount} to Account ${existingAccount.accno}. New balance is ${existingAccount.balance}.`);
  
    console.log(accnoD,depAmount,accounts,existingAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    }

    /////////////////////////for transferAmount/////////////////////////////////////////

    function transfer() {
        console.log("transfer");
        
        const senderAccNo = document.getElementById('sender').value.trim();
        const receiverAccNo = document.getElementById('receiver').value.trim();
        const transferAmount = parseFloat(document.getElementById('transferAmount').value.trim());
        
        // Find sender and receiver accounts
        const senderAccount = accounts.find(account => account.accno == senderAccNo);
        const receiverAccount = accounts.find(account => account.accno == receiverAccNo);
    
        // Validate inputs
        if (!senderAccount || !receiverAccount || isNaN(transferAmount) || transferAmount <= 0 || senderAccount.depositAmount < transferAmount) {
            alert('Please fill in all fields correctly and ensure sufficient balance.');
            return;
        }
    
        // Deduct amount from sender
        senderAccount.depositAmount -= transferAmount;
        senderAccount.history.push({
            type: 'transfer',
            to: receiverAccNo,
            amount: transferAmount,
            date: new Date().toLocaleString(),
        });
    
        // Add amount to receiver
        receiverAccount.depositAmount += transferAmount;
        receiverAccount.history.push({
            type: 'transfer',
            from: senderAccNo,
            amount: transferAmount,
            date: new Date().toLocaleString(),
        });
    
        // Log and save updated accounts
        console.log(senderAccNo, receiverAccNo, transferAmount, accounts);
        localStorage.setItem('accounts', JSON.stringify(accounts));
    
        alert(`Transferred ${transferAmount} from Account ${senderAccNo} to Account ${receiverAccNo}.`);
    }


    ///////////////////////////history///////////////////////


    function viewTransactionHistory(index) {
        // Save the index of the clicked account to localStorage to access it on the new page
        localStorage.setItem('accountIndex', index);
    
        // Redirect to the transaction history page
        window.location.href = 'transactionHistory.html';
        window.onload = loadTransactionHistory;
    }
    
    function loadTransactionHistory() {
        const accountIndex = localStorage.getItem('accountIndex');
        
        if (accountIndex === null) {
            alert('No account selected for viewing transaction history.');
            return;
        }
    
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const account = accounts[accountIndex];
        if (!account) {
            alert('Account not found.');
            return;
        }
    
        // Display account details
        const accountDetailsDiv = document.getElementById('account-details');
        accountDetailsDiv.innerHTML = `
            <h3>Account Details</h3>
            <p>${account.firstName} ${account.lastName}</p>
            <p>Account No: ${account.accno}</p>
            <p>Balance: $${account.depositAmount.toFixed(2)}</p>
        `;
    
        // Display transaction history
        const historyListDiv = document.getElementById('history-list');
        historyListDiv.innerHTML = ''; // Clear any previous history
    
        account.history.forEach((entry) => {
            const historyEntryDiv = document.createElement('div');
            historyEntryDiv.className = 'history-entry';
            historyEntryDiv.innerHTML = `
                <p>Type: ${entry.type}</p>
                <p>Amount: $${entry.amount.toFixed(2)}</p>
                <p>Date: ${entry.date}</p>
            `;
            historyListDiv.appendChild(historyEntryDiv);
        });
    }
