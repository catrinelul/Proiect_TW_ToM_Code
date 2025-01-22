const SERVER = "http://localhost:8080"

    //preluarea tuturor grupurilor
    export const getAllGroups = async () => {
        try {
            const response = await fetch (`${SERVER}/group`)
            if (!response.ok) {
                throw response
            }
            return await response.json();
        } catch(err) {
            console.warn(err)
        }
    };

    //preluarea grupurilor dupa id
    export const getGroupsFromUserId = async (userId) => {
        try {
            const response = await fetch (`${SERVER}/group/user/${userId}`)
            if (!response.ok) {
                throw response
            }
            return await response.json();
        } catch(err) {
            console.warn(err)
        }
    };

    // preluarea unui grup dupa id ul grupului
    export const getGroupsFromGroupId = async (groupId) => {
        try {
            const response = await fetch (`${SERVER}/group/${groupId}`)
            if (!response.ok) {
                throw response
            }
            return await response.json();
        } catch(err) {
            console.warn(err)
        }
    };

    // adaugare grup nou
    export const addGroup = async (group) => {
        try {
          const response = await fetch(`${SERVER}/group`, {
            method: 'post',
            body: JSON.stringify(group),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          return await response.json();
          
        } catch (err) {
          console.warn(err)
        }
    };

    // adaugare eveniment intr un grup
    export const addEvent = async (event) => {
        try {
            const response = await fetch(`${SERVER}/event`, {
                method: 'post',
                body: JSON.stringify(event),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
              return await response.json();
        } catch (error) {
            console.warn(error);
        }
    }

    //preluarea evenimentelor unui grup de evenimente
    export const getEventsFromGroupEvent = async (groupId) => {
        try {
            const response = await fetch (`${SERVER}/event/group/${groupId}`)
            if (!response.ok) {
                throw response
            }
            return await response.json();
        } catch(err) {
            console.warn(err)
        }
    };

    // preluare participanti grup
    export const getParticipantsFromEvent = async (eventId) => {
        try {
            const response = await fetch (`${SERVER}/participant/event/${eventId}`)
            if (!response.ok) {
                throw response
            }
            return await response.json();
        } catch (error) {
            console.warn(err)
        }
    }
    
