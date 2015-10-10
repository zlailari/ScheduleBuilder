import json
import re
import copy
from pprint import pprint

col = {0:  'CRN',
       1:  'SUBJ',
       2:  'CRS',
       3:  'SEC',
       4:  'TITLE',
       5:  'CR',
       6:  'DAYS',
       7:  'TIME',
       8:  'BLDG',
       9:  'RM',
       10: 'INSTRUCTOR',
       11: 'LIMIT',
       12: 'ENROLLMENT',
       13: 'WAITLIST',
       14: 'EXTRA'}
index = 0
table = []
course = {}
occurrence = []
occ_object = {'days': '',
              'st'  : '',
              'end' : ''}

f = open('raw_data.txt', 'r+')
for line in f:
    if "<tr>" in line:
        table.append(course)
        course = {}
        occurrence = []
        index = 0
    else:
        # Remove surrounding td tag
        lstrip = line.index('>') + 1
        rstrip = line.rfind('<')
        line = line[lstrip:rstrip]

        # Special Title processing
        if index == 4:
            line.strip()

        # Special day processing
        if index == 6:
            opts = []
            if line.count('<br>') > 1:
                opts = re.findall('(\w+)<br>', line)
            else:
                opts.append(line.replace('<br>', ''))
            for o in opts:
                newOcc = copy.deepcopy(occ_object)
                newOcc['days'] = o
                occurrence.append(newOcc)


        # Special time processing
        if index == 7:
            opts = []
            if line.count('<br>') > 1:
                opts = re.findall('(\w+-\w+)<br>', line)
            else:
                opts.append(line.replace('<br>', ''))

            for i, o in enumerate(opts):
                if o.find('-') == -1:
                    occurrence[i]['st'] = 'TBA'
                    occurrence[i]['end'] = 'TBA'
                else:
                    dash = o.index('-')
                    occurrence[i]['st'] = o[0:dash]
                    occurrence[i]['end'] = o[dash+1:]

        # Special building processing
        if index == 8:
            line.strip()

        # Special room processing
        if index == 9:
            line.strip()

        course['occu'] = occurrence
        course[col[index]] = line.replace('<br>', ' ')
        index += 1

for i in table:
    toremove = set()
    for idx1, j in enumerate(i['occu']):
        for idx2, q in enumerate(i['occu']):
            if idx1 != idx2 and j == q:
                lower = idx1 if idx1 < idx2 else idx2
                toremove.add(lower)
    if toremove:
        toremove = list(toremove)
        toremove.reverse()
        for x in toremove:
            del i['occu'][x]


json_out = json.dumps(table)
print json_out
