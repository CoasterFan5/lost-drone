<script lang="ts">
	type Person = 'Starship' | 'Done 837B' | 'Star Ship Broadcast' | 'System';

	const personColorMap: Record<Person, string> = {
		'Star Ship Broadcast': 'red',
		'Done 837B': '#FFA500',
		Starship: '#cc2fcc',
		System: '#74e38a'
	};

	const lines: {
		person: Person;
		message: string;
	}[] = [
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 60 seconds.'
		},
		{
			person: 'Done 837B',
			message: 'Hold Request; Distance too far, delay for 200 seconds.'
		},
		{
			person: 'Starship',
			message: 'Alerting Bridge of hold request.'
		},
		{
			person: 'Starship',
			message: 'Alert Failed, communications network did not respond.'
		},
		{
			person: 'Done 837B',
			message: 'Retry.'
		},
		{
			person: 'Starship',
			message: 'Retrying... Please wait.'
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 30 seconds.'
		},
		{
			person: 'Done 837B',
			message: 'Urgent. Retry. '
		},
		{
			person: 'Starship',
			message: 'Retrying... Please wait.'
		},
		{
			person: 'Starship',
			message: 'Retry failed, communications network did not respond.'
		},
		{
			person: 'Done 837B',
			message: 'Backup communications alert. Hold request.'
		},
		{
			person: 'Starship',
			message: 'Attempting to ping a backup communications network...'
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 15 seconds.'
		},
		{
			person: 'Starship',
			message: 'Communications network responded with code: 503. Service Unavailable. '
		},
		{
			person: 'Done 837B',
			message: 'Declaring Emergency; requesting immediate hold without contact.'
		},
		{
			person: 'Starship',
			message: 'Permission denied. Drone 837B must contact the bridge for hold.'
		},
		{
			person: 'Done 837B',
			message: 'Requesting hold.'
		},
		{
			person: 'Starship',
			message: 'Contacting Bridge…'
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 5 seconds.'
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 4 seconds.'
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 3 seconds.'
		},
		{
			person: 'Starship',
			message: 'Bridge connection failed, communications network failed to respond.'
		},
		{
			person: 'Done 837B',
			message: 'Requesting hold. Not onboard. '
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 2 seconds.'
		},
		{
			person: 'Star Ship Broadcast',
			message:
				'Code 372, takeoff sequence has been initiated, report to star ship. Sequence commence in 1 second.'
		},
		{
			person: 'Star Ship Broadcast',
			message: 'Code 373, takeoff sequence commenced. All systems are a go.'
		},
		{
			person: 'System',
			message: 'Connection error: out of range. Attempting to connect...'
		},
		{
			person: 'System',
			message: 'Connection failed. Attempting to connect...'
		},
		{
			person: 'System',
			message: 'Drone marked lost. '
		},
		{
			person: 'System',
			message: 'Activating lost drone protocol'
		}
	];

	let lineNumber: number = $state(0);

	const clickHandler = () => {
		lineNumber += 1;
		if (lineNumber > lines.length) {
			window.location.href = '/menu';
		}
	};
</script>

<button class="wrap" onclick={clickHandler}>
	<div class="logWrap">
		<div class="log">
			<p class="line">Drone 837B: System Log</p>
			<p class="line">System Time: 3213232105</p>
			<div class="spacer"></div>
			{#each lines as line, index (index)}
				{#if lineNumber > index}
					<p class="line">
						<span class="person" style="color: {personColorMap[line.person]}">{line.person}:</span>
						{line.message}
					</p>
					<div class="spacer"></div>
				{/if}
			{/each}
		</div>
	</div>
	<div class="tooltips">
		<span>Click anywhere to continue</span>
	</div>
</button>

<style lang="scss">
	.wrap {
		all: unset;
		box-sizing: border-box;
		background: var(--gray);
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100dvh;
		width: 100%;
		color: var(--white);
	}

	.logWrap {
		width: 100%;
		max-width: 80ch;
		height: 90dvh;
		position: relative;
	}

	.log {
		position: absolute;
		width: 100%;
		bottom: 0px;
		min-height: 100%;
	}

	.tooltips {
		height: 10dvh;
	}

	p {
		margin: 0;
	}

	.spacer {
		height: 1rem;
	}
</style>
