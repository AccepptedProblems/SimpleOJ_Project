#include <bits/stdc++.h>

#define namefile "three"

typedef char NameFile[1000];

using namespace std;

NameFile input, output, answer;
ifstream fi, fo, fa;
int n, m, p, q, a[10000];

int readInput() {
  fi.open(input);
}

int readOutput() {
  fo.open(output);
}

int readAnswer() {
  fa.open(answer);
}

bool check() {
    fi >> n >> m;
    for(int i=1; i<=n; i++) fi >> a[i];
    fo >> p >> q;
    int ans;
    fa >> ans;
    if (ans == -1)
    {
        if (p == -1)
        {

            cout << "Correct!\n";
            return 1;
        } else
        {
            cout << "Sai! Khong ton tai!\n";
            return 0;
        }
    }
    if(p == q)
    {
        cout << "2 so trung nhau" << endl;
        return false;
    }
    if(a[p] + a[q] != m)
    {
        cout << "Tong khong bang m" << endl;
        cout << p << " " << q << endl;
        return false;
    }
    cout << "Dung" << endl;
    return true;
}

main() {
  gets(input);
  gets(output);

  strcpy(answer, input);
  strcat(input,  "inp.txt");
  strcat(output, "out.txt");
  strcat(answer, "out.txt");

  readInput();
  readOutput();
  readAnswer();

  cout << ((check()) ? "1.00" : "0.00");
  fi.close();
  fo.close();
  fa.close();
//  system("pause");
}
