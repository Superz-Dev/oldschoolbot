import { Client } from 'discord.js';

import { Tasks } from '../constants';
import { ActivityTaskOptions } from '../types/minions';

export default function addSubTaskToActivityTask(
	client: Client,
	taskName: Tasks,
	subTaskToAdd: ActivityTaskOptions
) {
	const task = client.schedule.tasks.find(_task => _task.taskName === taskName);

	if (!task) throw `Missing activity task: ${taskName}.`;

	return task.update({
		data: {
			...task.data,
			subTasks: [...task.data.subTasks, subTaskToAdd].sort(
				(a, b) => a.finishDate - b.finishDate
			)
		}
	});
}
