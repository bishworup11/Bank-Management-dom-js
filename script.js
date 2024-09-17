
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
      console.log("deposit");
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